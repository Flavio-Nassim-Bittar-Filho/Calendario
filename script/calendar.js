// function leap year
const yearLeap = year => year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false


// function to generate the number of days in each month
const daysMonth = (year,month,startDay = 0) => {

    if(month == 1) {
        return yearLeap(year) ? 29 + startDay : 28 + startDay
    }
    else {
        return month == 3 || month == 5 || month == 8 || month == 10 ? 30 + startDay: 31 + startDay
    }

}


// function that generates a pseudo calendar with the number of days in each month
const pseudoMonths = (year) => {

    const months = []
    for(let month = 0; month < 12; month++){
        months.push(daysMonth(year,month))
    }

    return months

}


// functions to generate days
const generateDays = (year,month,amountDays,startDay) => {
    
    const months = pseudoMonths(year)

    // create days according to the months of the pseudo calendar
    const days = []
    if(months[month] == 31 && (months[month - 1] == undefined || months[month - 1] == 31)){

        for(let day = 0; day < amountDays; day++) {

            if(day < startDay) {
                days.push({day:(day + 1) + (31 - startDay)})
            }
            else if(day >= months[month] + startDay){
                days.push({day:((day + 1) - (months[month] + startDay))})
            }
            else {
                days.push({day:((day + 1) - startDay),text:''})
            }

        }

    }
    else {

        for(let day = 0; day < amountDays; day++) {

            if(day < startDay) {
                days.push({day:(day + 1) + (months[month - 1] - startDay)})
            }
            else if(day >= months[month] + startDay){
                days.push({day:((day + 1) - (months[month] + startDay))})
            }
            else {
                days.push({day:((day + 1) - startDay),text:''})
            }

        }

    }

    return days

}


// function to generate current day
const CurrentDay = (days,month,year) => {

    for(let i = 0; i < days.length; i++) {

        if(days[i].day == new Date().getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
            return days[i].day
        }

    }
    
}


// function builder calendar
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
    
    // logic to add the months, days and notes 
    months.forEach((month,mIndex) => {

        let firstDay = new Date(yeear,mIndex,1) 
        month.startDay = firstDay.getDay()
        month.length = daysMonth(year,mIndex)
        month.days = generateDays(year,mIndex,42,month.startDay)
        month.currentDay = CurrentDay(month.days,mIndex,year)
        month.getDay = (dayCompare) => month.days.slice(month.startDay,month.startDay + month.length).filter(element => element.day == dayCompare)[0]

    })

    // object calendar
    const calendar = {
        year,
        months,
        getIndexMonth : (monthCompare) => months.indexOf(months.filter(element => element.month == monthCompare)[0]),
        getMonth : (monthCompare) => typeof(monthCompare) != typeof(0) ? months.filter(element => element.month == monthCompare)[0] : months[monthCompare],
        getYear : () => year,
        setYear : (go) => go == 'next' ? year += 1 : go == 'back' ? year -= 1 : year = new Date().getFullYear()
        
    }

    return calendar

}