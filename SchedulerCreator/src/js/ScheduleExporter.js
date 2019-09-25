const exportMethods = require('./exporters/exportMethods.js');

class ScheduleExporter {
    /**
     *
     * @param timedScheduleObject
     */
    constructor(timedScheduleObject) {
        this.timedScheduleObject = timedScheduleObject;
    }

    toHTML() {
        return exportMethods.toHTML(this.timedScheduleObject)
    }

    /**
     *
     * @param includeLunch
     * @return {ICalGenerator.ICalCalendar}
     */
    toiCal(includeLunch = false) {
        return exportMethods.toiCal(this.timedScheduleObject, includeLunch)
    }
}

module.exports = ScheduleExporter;
