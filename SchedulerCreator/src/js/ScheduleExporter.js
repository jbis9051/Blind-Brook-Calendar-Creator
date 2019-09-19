const exportMethods = require('./exporters/exportMethods.js');

class ScheduleExporter {
    constructor(timedScheduleObject) {
        this.timedScheduleObject = timedScheduleObject;
    }

    toHTML() {
        return exportMethods.toHTML(this.timedScheduleObject)
    }

    toiCal(includeLunch = false) {
        return exportMethods.toiCal(this.timedScheduleObject, includeLunch)
    }
}

module.exports = ScheduleExporter;
