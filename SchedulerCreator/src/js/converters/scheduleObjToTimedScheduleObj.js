const getScheduleTimes = require('../helpers/getScheduleTimes.js');

module.exports = (scheduleObj, type) => {
    const {periodTimes} = getScheduleTimes(type);
    let timedScheduleObj = {};
    Object.assign(timedScheduleObj, scheduleObj);
    Object.values(timedScheduleObj).forEach(order => {
        const lunchIndex = periodTimes.findIndex(periodTime => periodTime.period === "lunch");
        order.splice(lunchIndex, 0, {
            period: "lunch",
            classes: [{
                "name": "Lunch",
                "room": "Cafeteria",
            }]
        });
        const extraHelpIndex = periodTimes.findIndex(periodTime => periodTime.period === "extra help");
        order.splice(extraHelpIndex, 0, {
            period: "extra help",
            classes: [{
                "name": "Extra Help",
            }]
        });
        order.forEach((block, index) => {
            const blockTimes = periodTimes[index];
            block.from = blockTimes.from;
            block.to = blockTimes.to;
        });
    });
    return timedScheduleObj;
};
