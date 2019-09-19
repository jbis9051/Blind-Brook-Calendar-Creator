const periodOrder = require('../../assets/json/schedule.json');

module.exports = (studentSchedule, strict) => {
    const scheduleObj = {};
    Object.entries(periodOrder).forEach(([letterDay, order]) => {
        const classesOnThisDay = studentSchedule.classes.filter(aClass => aClass["letter-days"].includes(letterDay));
        scheduleObj[letterDay] = order.map(period => {
            let theClasses = classesOnThisDay.filter(aClass => aClass.period === period);
            if (theClasses.length === 0) {
                theClasses = [null];
            }
            if (strict) {
                theClasses = theClasses.slice(0, 1);
            }
            return {
                classes: theClasses,
                period: period,
            }
        })
    });
    return scheduleObj;
};
