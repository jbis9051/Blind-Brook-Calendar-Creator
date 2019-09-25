const studentScheduleToScheduleObject = require('./converters/studentScheduleToScheduleObject');
const scheduleObjToTimedScheduleObj = require('./converters/scheduleObjToTimedScheduleObj.js');

const ScheduleExporter = require('./ScheduleExporter.js');

class Schedule {
    /**
     * Creates a schedule object based on a studentSchedule object
     * @param {Object} studentSchedule
     * @param {boolean} strict - whether to force one or zero class per block. If false, multiple classes can occur at the same time.
     */
    constructor(studentSchedule, strict = true) {
        this.studentSchedule = studentSchedule;
        this.scheduleObject = studentScheduleToScheduleObject(studentSchedule, strict);
    }

    /**
     *
     * @param {scheduleTypes} type - The type to create
     * @return {{}} - Timed schedule object
     */
    getTimed(type) {
        return scheduleObjToTimedScheduleObj(this.scheduleObject, type);
    }

    /**
     *
     * @param {scheduleTypes} type
     * @return {ScheduleExporter}
     */
    getExporter(type) {
        return new ScheduleExporter(scheduleObjToTimedScheduleObj(this.scheduleObject, type));
    }

}

module.exports = Schedule;
