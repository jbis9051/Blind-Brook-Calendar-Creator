const studentScheduleToScheduleObject = require('./converters/studentScheduleToScheduleObject');
const scheduleObjToTimedScheduleObj = require('./converters/scheduleObjToTimedScheduleObj.js');

const ScheduleExporter = require('./ScheduleExporter.js');

class Schedule {
    constructor(studentSchedule, strict = true) {
        this.studentSchedule = studentSchedule;
        this.scheduleObject = studentScheduleToScheduleObject(studentSchedule, strict);
    }

    getTimed(type) {
        return scheduleObjToTimedScheduleObj(this.scheduleObject, type);
    }

    getExporter(type) {
        return new ScheduleExporter(scheduleObjToTimedScheduleObj(this.scheduleObject, type));
    }

}

module.exports = Schedule;
