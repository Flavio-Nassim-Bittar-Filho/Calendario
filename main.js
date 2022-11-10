// function leap year
const leapYear = year => year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false


// function to generate the number of days
const numberDays = (month,year) => {

    if(month == 1) {
        return leapYear(year) ? 29 : 28
    }
    else {
        return month == 3 || month == 5 || month == 8 || month == 10 ? 30 : 31
    }

}


//  function that generates a pseudo calendar with the number of days in each month
const monthsDays = year => {

    const months = []
    for(let month = 0; month < 12; month++){
        months.push(numberDays(month,year))
    }

    return months
}


// functions to generate days
const days = (month,year) => {

    const months = monthsDays(year)
    const days = []

    let startDay = new Date(year,month,1).getDay()
    
    for(let day = 0; day < 42; day++) {

        if(day < startDay) {
            months[month] == 31 && (months[month - 1] == undefined || months[month - 1] == 31) ? days.push({day:(day + 1) + (months[month] - startDay)}) : days.push({day:(day + 1) + (months[month - 1] - startDay)}) 
        }
        else if(day >= months[month] + startDay){
            days.push({day:((day + 1) - (months[month] + startDay))})
        }
        else {
            days.push({day:((day + 1) - startDay),text:''})
        }
        
    }
    
    return days

}


// function builder calendar
const calendar = year => {

    const months = [
        {month:'Janeiro',days:null},
        {month:'Fevereiro',days:null},
        {month:'Março',days:null},
        {month:'Abril',days:null},
        {month:'Maio',days:null},
        {month:'Junho',days:null},
        {month:'Julho',days:null},
        {month:'Agosto',days:null},
        {month:'Setembro',days:null},
        {month:'Outubro',days:null},
        {month:'Novembro',days:null},
        {month:'Dezembro',days:null}
    ]
    
    months.forEach((month,index) => month.days = days(index,year))


    const calendar = {
        year,
        months,
        getMonth : (monthCompare) => months.filter(element => element.month == monthCompare)[0],
    }

    return calendar

}





// 
// starting with graphical interface
// 





// HTML buttons
const nodeButtons = document.querySelectorAll('button')
const htmlButtons = []
nodeButtons.forEach(button => htmlButtons.push(button))
const [monthButton,themeButton,currentDateButton,backButton,nextButton,textButton] = htmlButtons


// HTML year
const yearText = document.querySelector('.year')


// HTML tables
const nodeTables = document.querySelectorAll('table') 
const htmlTables = []
nodeTables.forEach(element => htmlTables.push(element))

const monthsTable = [] 
htmlTables[0].querySelectorAll('td').forEach(element => monthsTable.push(element))

const daysTable = [] 
htmlTables[1].querySelectorAll('td').forEach(element => daysTable.push(element))






// plot element on screen
const plot = () => {
    yearText.textContent = myCalendar.year

    daysTable.forEach((day,index) => {
        day.textContent = myCalendar.getMonth(monthButton.textContent).days[index].day

        myCalendar.getMonth(monthButton.textContent).days[index].text == undefined ? day.classList.remove('valid_day') : day.classList.add('valid_day')

        if(day.classList.contains('weekend') && day.classList.contains('valid_day')) {
            day.classList.remove('valid_day')
            day.classList.remove('weekend') 
            day.classList.add('valid_day-weekend') 
        } 
        else if(day.classList.contains('valid_day-weekend') && day.classList.contains('valid_day')) {
            day.classList.remove('valid_day')
        }
        else if(day.classList.contains('valid_day-weekend')) {
            day.classList.add('weekend') 
            day.classList.remove('valid_day-weekend') 
        }

    })

}






// start calendar
let myCalendar = calendar(new Date().getFullYear())


// start calendar in graphical interface
yearText.textContent = myCalendar.year
monthButton.textContent = myCalendar.months[new Date().getMonth()].month
monthsTable.forEach((month,index) => month.textContent = myCalendar.months[index].month)
plot()





// buttons to change the year 
nextButton.addEventListener('click', () => {
    myCalendar = calendar(myCalendar.year += 1)
    plot()

})

backButton.addEventListener('click', () => {
    myCalendar = calendar(myCalendar.year -= 1)
    plot()

})





// butons to change the months
monthButton.addEventListener('click', () => {

    if(htmlTables[0].classList.contains('months-active')) {
        htmlTables[0].classList.add('months')
        htmlTables[0].classList.remove('months-active')
    } 
    else {
        htmlTables[0].classList.remove('months')
        htmlTables[0].classList.add('months-active')
    }

})

monthsTable.forEach(month => {

    month.addEventListener('click', () => {
    
        if(htmlTables[0].classList.contains('months-active')) {
            htmlTables[0].classList.add('months')
            htmlTables[0].classList.remove('months-active')
        } 
        else {
            htmlTables[0].classList.remove('months')
            htmlTables[0].classList.add('months-active')
        }

        monthButton.textContent = myCalendar.getMonth(month.textContent).month
        plot()

    })
    
})





// click events in days
daysTable.forEach((day,index) => {

    day.addEventListener('click', () => {

        if(myCalendar.getMonth(monthButton.textContent).days[index].text == undefined) {
            if(index > 27) {
                if(myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) + 1 > 11) {
                    myCalendar = calendar(myCalendar.year += 1)
                    monthButton.textContent = myCalendar.months[0].month
                }
                else {
                    monthButton.textContent = myCalendar.months[myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) + 1].month
                }
                plot()
            }
            else {
                if(myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) - 1 < 0) {
                    myCalendar = calendar(myCalendar.year -= 1)
                    monthButton.textContent = myCalendar.months[11].month
                }
                else {
                    monthButton.textContent = myCalendar.months[myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) - 1].month
                }
                plot()
            }
        }

    })

})
