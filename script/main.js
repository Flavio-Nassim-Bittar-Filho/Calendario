// função para saber se o ano é bissexto
const yearBi = year => year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false

// função para saber a quantidade de dias de cada mes 
const daysMonth = (year,month,startDay = 0) => {

    if(month == 1) {
        return yearBi(year) ? 29 + startDay : 28 + startDay
    }
    else {
        return month == 3 || month == 5 || month == 8 || month == 10 ? 30 + startDay: 31 + startDay
    }

}


// função que gera um pseudo calendario com o numero de dias de cada mese
const pseudoMonths = (year) => {

    const months = []
    for(let month = 0; month < 12; month++){
        months.push(daysMonth(year,month))
    }

    return months

}


// função para gerar dias 
const generateDays = (year,month,amountDays,startDay) => {
    
    // pseudo calendario 
    const months = pseudoMonths(year)

    // cria os dias conforme o os meses do pseudo calendario
    const days = []
    if(months[month] == 31 && (months[month - 1] == undefined || months[month - 1] == 31)){
        for(let day = 0; day < amountDays; day++) {
            if(day < startDay) {
                days.push({day:(day + 1) + (31 - startDay),text:''})
            }
            else if(day >= months[month] + startDay){
                days.push({day:((day + 1) - (months[month] + startDay)),text:''})
            }
            else {
                days.push({day:((day + 1) - startDay),text:''})
            }
        }
    }
    else {
        for(let day = 0; day < amountDays; day++) {
            if(day < startDay) {
                days.push({day:(day + 1) + (months[month - 1] - startDay),text:''})
            }
            else if(day >= months[month] + startDay){
                days.push({day:((day + 1) - (months[month] + startDay)),text:''})
            }
            else {
                days.push({day:((day + 1) - startDay),text:''})
            }
        }
    }

    return days

}


// função para gerar dia atual
const CurrentDay = (days,month,year) => {

    // pseudo calendario com o numero de dias de cada mese
    const months = pseudoMonths(year)

    for(let i = 0; i < days.length; i++) {

        if(days[i].day == date.getDate() && month == date.getMonth() && year == date.getFullYear()) {
            return days[i].day
        }
    }
    
}



// função construtora do calendario
const calendar = yeear => {

    const currentYear = new Date().getFullYear()
    let year = yeear
    let months = [
        {month:'Janeiro',days:undefined},
        {month:'Fevereiro',days:undefined},
        {month:'Março',days:undefined},
        {month:'Abril',days:undefined},
        {month:'Maio',days:undefined},
        {month:'Junho',days:undefined},
        {month:'Julho',days:undefined},
        {month:'Agosto',days:undefined},
        {month:'Setembro',days:undefined},
        {month:'Outubro',days:undefined},
        {month:'Novembro',days:undefined},
        {month:'Dezembro',days:undefined}
    ]
    


    // logica para adicionar os meses, dias e anotações  
    months.forEach((month,mIndex) => {
        let firstDay = new Date(yeear,mIndex,1) 
        month.startDay = firstDay.getDay()
        month.length = daysMonth(year,mIndex)
        month.days = generateDays(year,mIndex,42,month.startDay)
        month.currentDay = CurrentDay(month.days,mIndex,year)
    })


    // obj calendario
    const calendar = {
        year,
        months,
        getIndexMonth : (monthCompare) => months.indexOf(months.filter(element => element.month == monthCompare)[0]),
        getMonth : (monthCompare) => typeof(monthCompare) != typeof(0) ? months.filter(element => element.month == monthCompare)[0] : months[monthCompare],
        getYear : () => year,
        setYear : (go) => go == 'next' ? year += 1 : go == 'current' ?  year = currentYear : year -= 1,
    }

    return calendar

}






// colocando no HTML as informaçoes

// botoes de avançar e voltar os anos
const HTMLbuttons = document.querySelectorAll('button')

// botão de localizar data atual
const HTMLcurrentData = document.querySelector('.currentDate')

// ano selecionado 
const HTMLyear = document.querySelector('.year')

// mes selecionado
const HTMLmonth = document.querySelector('.month')

// tabela com os dias do mes 
const HTMLdate = document.querySelectorAll('.days td')

// campo que armazena a tabela de meses
const HTMLmonths = document.querySelector('.months')

// tabela de meses para seleção
const HTMLtbMonths = document.querySelectorAll('.months td')



// função para popular os dias no calendario -> interface grafica
const population = (calendar,elementD,dIndex) => {
    
    let startMonth = calendar.getMonth(HTMLmonth.textContent).startDay
    let endMonth = calendar.getMonth(HTMLmonth.textContent).length + startMonth
    let valueDay = calendar.getMonth(HTMLmonth.textContent).days[dIndex].day
    let currentDay = calendar.getMonth(HTMLmonth.textContent).currentDay
    
    if(dIndex <  startMonth || dIndex >= endMonth) {
        elementD.textContent = valueDay
        elementD.classList.add('anotherMonth')
        elementD.classList.remove('currentDay')

    }
    else {
        elementD.textContent = valueDay 
        currentDay == valueDay ? elementD.classList.add('currentDay') : elementD.classList.remove('currentDay')
        elementD.classList.remove('anotherMonth')
        
    }

}


// função para gerar data atual -> interface grafica
const currentData = (myCalendar) => {
    myCalendar = calendar(myCalendar.setYear('current'))
    HTMLyear.textContent = myCalendar.getYear()
    HTMLmonth.textContent = myCalendar.getMonth(date.getMonth()).month
    HTMLdate.forEach((elementD,dIndex) => population(myCalendar,elementD,dIndex))
    console.log(myCalendar)
    
}




// inicializando o calendario na data atual ao carregar a pagina
let date = new Date()
let myCalendar = calendar(date.getFullYear()) 
currentData(myCalendar)


// alterando os Anos
HTMLbuttons.forEach(button => {

    // gerando novo calendario
    button.addEventListener('click',() => {
        
        button.className == 'next' ? myCalendar = calendar(myCalendar.setYear('next')) : myCalendar = calendar(myCalendar.setYear('back'))
        HTMLyear.textContent = myCalendar.getYear()
        console.log(myCalendar)

        HTMLdate.forEach((elementD,dIndex) => population(myCalendar,elementD,dIndex))

    })

})

// indo para a data atual
HTMLcurrentData.addEventListener('click', () => currentData(myCalendar))

// abrindo tabela de meses
HTMLmonth.addEventListener('click', () => {
    HTMLmonths.classList.contains('months-active') ? HTMLmonths.classList.remove('months-active') : HTMLmonths.classList.add('months-active')
    
})

//alterando o mes
HTMLtbMonths.forEach((elementTB,mIndexTB) => {

    elementTB.textContent = myCalendar.getMonth(mIndexTB).month
    
    elementTB.addEventListener('click', () => {
        HTMLmonth.textContent = myCalendar.getMonth(elementTB.textContent).month
        
        HTMLdate.forEach((elementD,dIndex) => population(myCalendar,elementD,dIndex))
        
        HTMLmonths.classList.remove('months-active')
    
    })

})



