const path = require("path");
const ical = require('ical-generator');

const letter_days = require('./letter_days.js')(path.join(__dirname, 'assets', 'ical', 'letter-days.ics'));


module.exports = (timedScheduleObject, includeLunch) => {
    const year = new Date().getFullYear();

    const cal = ical({
        name: `BB Schedule ${year} - iCal`,
        timezone: 'America/New_York',
        prodId: {
            company: 'bbscheduler.com',
            product: 'ical-generator'
        },
    });
    letter_days.forEach(dayEvent => {
        const classesOnThisDay = timedScheduleObject[dayEvent.letter];
        classesOnThisDay.forEach(aClassList => {
            if (!includeLunch && aClassList.period === "lunch") {
                return;
            }
            if (aClassList.period === "extra help") {
                return;
            }
            aClassList.classes.forEach(aClass => {
                if (aClass === null) { // FREE period
                    return;
                }
                cal.createEvent({
                    start: dateAndTimeToDate(dayEvent.start, aClassList.from),
                    end: dateAndTimeToDate(dayEvent.start, aClassList.to),
                    summary: aClass.name,
                    location: aClass.room,
                });
            });
        });
    });
    return cal;
};

function dateAndTimeToDate(dayDate, timeString) {
    const time = timeString.split(':');
    return new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), parseInt(time[0]), parseInt(time[1]));
}
