const path = require("path");
const ical = require('ical-generator');
const cheerio = require('cheerio');

const letter_days = require('./letter_days.js')(path.join(__dirname, '..', 'assets', 'ical', 'letter-days.ics'));
const periodTimes = require('../assets/json/times.json');
const periodOrder = require('../assets/json/schedule.json');

const lunchTimes = periodTimes.find(period => period.period === "lunch");

const year = new Date().getFullYear();
/**
 *
 * @param studentScheduleClasses
 * @param includeLunch
 * @return {ICalGenerator.ICalCalendar}
 */
module.exports.generateCal = (studentScheduleClasses,includeLunch) => {
    const cal = ical({
            name: `BB Schedule ${year} - iCal`,
            timezone: 'America/New_York',
            prodId: {
                company: 'bbscheduler.com',
                product: 'ical-generator'
            },
        });
    letter_days.forEach(day => {
        if(includeLunch){
            cal.createEvent({
                start: dateAndTimeToDate(day.start, lunchTimes.from),
                end: dateAndTimeToDate(day.start, lunchTimes.to),
                summary: "Lunch",
                location: "Cafeteria",
            });
        }
        const classesOnThisDay = studentScheduleClasses.filter(aClass => aClass["letter-days"].includes(day.letter));
        const todaysPeriodOrder = periodOrder[day.letter];
        classesOnThisDay.forEach(aClass => {
            const periodTime = periodTimes.find(period => period.period === (todaysPeriodOrder.indexOf(aClass.period) + 1));
            if (!periodTime) {
                return; // this shouldn't happen but if they messed up how they entered the data then we don't want to crash our app :(
            }
            cal.createEvent({
                start: dateAndTimeToDate(day.start, periodTime.from),
                end: dateAndTimeToDate(day.start, periodTime.to),
                summary: aClass.name,
                location: aClass.room,
            });
        });
    });
    return cal;
};


function dateAndTimeToDate(dayDate, timeString) {
    const time = timeString.split(':');
    return new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), parseInt(time[0]), parseInt(time[1]));
}

function timeFormat(time){
    let [hour,min] = time.split(":");
    hour = parseInt(hour);
    min = parseInt(min);
    if(hour > 12){
        hour -= 12;
    }
    return `${hour}:${min}`;
}
module.exports.generateHTML = (studentScheduleClasses) => { //TODO: this should generate a table based off an object. getSchedule() returns an object and then construct html.
    const $ =  cheerio.load(`<table><thead><tr><th></th></tr></thead><tbody></tbody></table>`);
    const letters =  Object.keys(periodOrder);
    letters.forEach(day => {
        $('table thead tr').append(`<th class="letter">${day}</th>`);
    });

    periodTimes.forEach(period => {
        const row = cheerio.load(`<table><tbody><tr></tr></tbody></table>`);
        let special = false;
        if(period.period === "lunch"){
            special = `<td colspan="${letter_days.length}" class="lunch">LUNCH</td>`;
        }
        if(period.period === "extra help"){
            special = `<td colspan="${letter_days.length}">EXTRA HELP</td>`;
        }
        row('tr').append(`<td class="time">${timeFormat(period.from)} - ${timeFormat(period.to)}</td>`);
        if(special){
            row('tr').append(special);
        } else {
            letters.forEach(day => {
                const classesOnThisDay = studentScheduleClasses.filter(aClass => aClass["letter-days"].includes(day));
                const thePeriod = periodOrder[day][period.period - 1];
                const theClass = classesOnThisDay.find(aClass => aClass.period === thePeriod);
                if(!theClass){
                    row('tr').append(`<td class="free">FREE</td>`);
                } else {
                    row('tr').append(`<td class="class">${theClass.name}${theClass.room !== "" ? `<br>${theClass.room}` : ""}</td>`);
                }
            });
        }
        $('table tbody').append(row('table tbody').html());
    });
    return $('body').html();
};
