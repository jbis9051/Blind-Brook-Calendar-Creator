const scheduleTypes = require('../constants/scheduleTypes.js');

const periodTimes = require('../../assets/json/times.json');

module.exports = (scheduleType) => {
    let periodTimeSelected;
    switch (scheduleType) {
        case scheduleTypes.HIGH_SCHOOL :
            periodTimeSelected = periodTimes.high_school;
            break;
        case scheduleTypes.MIDDLE_SCHOOL:
            periodTimeSelected = periodTimes.middle_school;
            break;
        default:
            throw new Error("INVALID TYPE");
    }
    return {periodTimes: periodTimeSelected, lunchTimes: getLunchTime(periodTimeSelected)};
};

function getLunchTime(timesObj) {
    return timesObj.find(period => period.period === "lunch");
}
