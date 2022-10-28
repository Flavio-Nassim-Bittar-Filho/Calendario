// função para saber se o ano é bissexto
const yearBi = year => year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false

// função para saber se o mes tem 30 ou 31 dias 
const daysMonth = (year,month,startDay = 0) => {

    if(month == 1) {
        return yearBi(year) ? 29 + startDay : 28 + startDay
    }
    else {
        return month == 3 || month == 5 || month == 8 || month == 10 ? 30 + startDay: 31 + startDay
    }

}

// função para gerar dias 
const generateDays = (year,month,amountDays,startDay) => {
    
    // pseudo calendario com o numero de dias de cada mese
    const months = []
    for(let month = 0; month < 12; month++){
        months.push(daysMonth(year,month))
    }

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



// função construtora do calendario
const calendar = yeear => {

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
    })


    // obj calendario
    const calendar = {
        year,
        months: months,
        getIndexMonth : (monthCompare) => months.indexOf(months.filter(element => element.month == monthCompare)[0]),
        getMonth : (monthCompare) => typeof(monthCompare) != typeof(0) ? months.filter(element => element.month == monthCompare)[0] : months[monthCompare],
        getYear : () => yeear,
        setYear : (go) => go == 'next' ? yeear += 1 : yeear -= 1,
    }

    return calendar

}






// colocando no HTML as informaçoes

// botoes
const HTMLbuttons = document.querySelectorAll('button')

// ano
const HTMLyear = document.querySelector('.year')

// mes
const HTMLmonth = document.querySelector('.month')

// datas
const HTMLdate = document.querySelectorAll('td')


// inicialização com data atual
let date = new Date()
let myCalendar = calendar(date.getFullYear()) 
HTMLyear.textContent = myCalendar.year
HTMLmonth.textContent = myCalendar.months[date.getMonth()].month



// alterando os Anos
HTMLbuttons.forEach(button => {

    // gerando novo calendario apartir do ano
    button.addEventListener('click',() => {
        
        button.className == 'next' ? myCalendar = calendar(myCalendar.setYear('next')) : myCalendar = calendar(myCalendar.setYear('back'))
        HTMLyear.textContent = myCalendar.getYear()
        console.log(myCalendar)
        console.log(myCalendar.getMonth(HTMLmonth.textContent))

    })

})



// alterando os dias
// console.log(HTMLdate)
console.log(myCalendar)
