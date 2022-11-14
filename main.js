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





// HTML body
const body = document.querySelector('body')


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


// HTML textArea
const containerText = document.querySelector('.container_text') 
const textArea = containerText.querySelector('textarea')





// indentify current day
const currentDay = day => {

    if(myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) == new Date().getMonth() && yearText.textContent == new Date().getFullYear()) {
        if(day.textContent == new Date().getDate() && (day.classList.contains('valid_day') || day.classList.contains('valid_day_weekend'))) {
            day.classList.add('current')
            selected(day.textContent)
        }
    }
    else {
        day.classList.remove('current')
        if(day.textContent == 1 && (day.classList.contains('valid_day') || day.classList.contains('valid_day_weekend'))) {
            selected(1)
        }

    }

}






// plot element on screen
const plot = () => {
    yearText.textContent = myCalendar.year

    daysTable.forEach((day,index) => {
        let logicDay = myCalendar.getMonth(monthButton.textContent).days[index]
        day.textContent = logicDay.day

        myCalendar.getMonth(monthButton.textContent).days[index].text == undefined ? day.classList.remove('valid_day') : day.classList.add('valid_day')

        if(day.classList.contains('weekend') && day.classList.contains('valid_day')) {
            day.classList.remove('valid_day')
            day.classList.remove('weekend') 
            day.classList.add('valid_day_weekend') 
        } 
        else if(day.classList.contains('valid_day_weekend') && day.classList.contains('valid_day')) {
            day.classList.remove('valid_day')
        }
        else if(day.classList.contains('valid_day_weekend')) {
            day.classList.add('weekend') 
            day.classList.remove('valid_day_weekend') 
        }
        
        // marked day
        logicDay.text != '' && logicDay.text != undefined ? day.classList.add('marked') : day.classList.remove('marked')

        // current day
        currentDay(day)

    })
    
}





// selected days on screen
const selected = dayCompare => {
    const validDays = daysTable.filter(day => day.classList.contains('valid_day') || day.classList.contains('valid_day_weekend'))
    const daySelected = validDays.filter(day => day.textContent == dayCompare)[0]
    if(!daySelected.classList.contains('selected')) {
        daysTable.forEach(day => day.classList.remove('selected'))
        daySelected.classList.add('selected')
        textArea.value = myCalendar.getMonth(monthButton.textContent).days.filter(day => day.text != undefined && day.day == daySelected.textContent)[0].text
    }

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






// go to current day
currentDateButton.addEventListener('click', () => {
    if(yearText.textContent == new Date().getFullYear()) {
        monthButton.textContent = myCalendar.months[new Date().getMonth()].month
        plot()
    }
    else {
        myCalendar = calendar(new Date().getFullYear())
        yearText.textContent = myCalendar.year
        monthButton.textContent = myCalendar.months[new Date().getMonth()].month
        plot()
    }
    
})






// set theme
themeButton.addEventListener('click', () => {
    const themes = {'default' : 'dark','dark' : 'default'}
    body.setAttribute('data-theme',themes[body.dataset.theme])
})






// click events in days
daysTable.forEach((day,index) => {

    day.addEventListener('click', () => {

        let daySelected = myCalendar.getMonth(monthButton.textContent).days[index].day

        // change month to invalid days
        if(myCalendar.getMonth(monthButton.textContent).days[index].text == undefined) {
            if(index > 27) {
                if(myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) + 1 > 11) {
                    myCalendar = calendar(myCalendar.year += 1)
                    monthButton.textContent = myCalendar.months[0].month
                }
                else {
                    monthButton.textContent = myCalendar.months[myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) + 1].month
                }
            }
            else {
                if(myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) - 1 < 0) {
                    myCalendar = calendar(myCalendar.year -= 1)
                    monthButton.textContent = myCalendar.months[11].month
                }
                else {
                    monthButton.textContent = myCalendar.months[myCalendar.months.indexOf(myCalendar.getMonth(monthButton.textContent)) - 1].month
                }
            }

            plot()
            
        }
        
        // selected day
        selected(daySelected)

    })

})






// opening text area
textButton.addEventListener('click', () => {
    if(textButton.classList.contains('text_button-active')) {
        containerText.classList.remove('container_text-active')
        containerText.classList.add('container_text')
        textButton.classList.remove('text_button-active')
        textButton.classList.add('text_button')
    }
    else {
        containerText.classList.remove('container_text')
        containerText.classList.add('container_text-active')
        textButton.classList.remove('text_button')
        textButton.classList.add('text_button-active')
    }

})





// capture values ​​for each day and mark
containerText.addEventListener('keyup', () => {
    const daySelected = daysTable.filter(day => day.classList.contains('selected'))[0]
    const day =  myCalendar.getMonth(monthButton.textContent).days.filter(day => day.day == daySelected.textContent)[0]
    day.text = textArea.value
    textArea.value != '' ? daySelected.classList.add('marked') : daySelected.classList.remove('marked')

})
