// função para saber se o ano é bissexto
const yearBi = year => year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false

// função para saber se o mes tem 30 ou 31 dias 
const daysMonth = (month) => {

    if(month == 1) {
        return 28
    }
    else {
        return month != 0 && month != 6 && month % 2 == 0 ? 30 : 31 
    }

}


// função construtora do calendario
const calendar = (year) => {

    // obj calendario
    const calendar = {
        year,
        months: [
            {month:'Janeiro',days:[]},
            {month:'Fevereiro',days:[]},
            {month:'Março',days:[]},
            {month:'Abril',days:[]},
            {month:'Maio',days:[]},
            {month:'Junho',days:[]},
            {month:'Julho',days:[]},
            {month:'Agosto',days:[]},
            {month:'Setembro',days:[]},
            {month:'Outubro',days:[]},
            {month:'Novembro',days:[]},
            {month:'Dezembro',days:[]}
        ],
    }

    // logica para adicionar os meses, dias e anotacoes de cada ano 
    calendar.months.forEach((month,mIndex) => {
        let firstDay = new Date(year,mIndex,1) 
        
        if(yearBi(year)){
            month.startDay = firstDay.getDay()
            mIndex == 1 ? month.days.push([...Array(daysMonth(mIndex)+1)]) : month.days.push([...Array(daysMonth(mIndex))])
        } 
        else {
            month.startDay = firstDay.getDay()
            month.days.push([...Array(daysMonth(mIndex))])
        }
    })

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
        
        button.className == 'next' ? myCalendar = calendar(myCalendar.year+=1) : myCalendar = calendar(myCalendar.year-=1)
        HTMLyear.textContent = myCalendar.year
        console.log(myCalendar)

    })

})


console.log(HTMLmonth.textContent)
console.log(myCalendar.indexMonth(HTMLmonth.textContent))

// alterando os dias
// console.log(HTMLdate)
// HTMLdate.forEach((date,i) => {

//     console.log(`${i})${date.textContent}`)
// })