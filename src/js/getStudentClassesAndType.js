const scheduleTypes = require('../../SchedulerCreator/src/js/constants/scheduleTypes.js');

module.exports.getStudentClassesAndType = (body) => {
    return new Promise((resolve, reject) => {
        body = JSON.parse(JSON.stringify(body)); // the fact that i have to do this is ridiculous. I want a refund.

        if (!body.hasOwnProperty("names[]") || !body.hasOwnProperty("periods[]") || !body.hasOwnProperty("letters[]") || !body.hasOwnProperty("rooms[]") || !body.hasOwnProperty("teachers[]") || !body.hasOwnProperty("type")) {
            reject({
                errorTitle: "An Error occurred",
                errorMessage: "Missing data."
            });
            return;
        }
        if (typeof body["names[]"] === "string") { /* for some stupid reason if only one class is submitted it will submit as a string not an array, this fixes this by putting in an array*/
            body["names[]"] = [body["names[]"]];
            body["periods[]"] = [body["periods[]"]];
            body["letters[]"] = [body["letters[]"]];
            body["rooms[]"] = [body["rooms[]"]];
            body["teachers[]"] = [body["teachers[]"]];
        }
        if (body["names[]"].length !== body["periods[]"].length || body["letters[]"].length !== body["names[]"].length) {
            reject({
                errorTitle: "An Error occurred",
                errorMessage: "Unequal input contents. Please try again."
            });
            return;
        }
        if (body["letters[]"].some(e => !e.match(/([A-H],?)*[A-H]$/)) || body["periods[]"].some(e => e === "" || isNaN(e) || parseInt(e) > 9 || parseInt(e) < 1)) { // some simple server side validation
            reject({errorTitle: "An Error occurred", errorMessage: "Invalid input."});
            return;
        }
        if (isNaN(body["type"]) || !(parseInt(body["type"]) === 0 || parseInt(body["type"]) === 1)) { // some more simple server side validation
            reject({errorTitle: "An Error occurred", errorMessage: "Invalid input."});
            return;
        }
        const studentSchedule = {classes: []};
        body["names[]"].forEach((val, index) => {
            studentSchedule.classes.push({
                name: val,
                "letter-days": body["letters[]"][index].split(','),
                room: body["rooms[]"][index] || "",
                period: parseInt(body["periods[]"][index]),
                teacher: body["teachers[]"][index] || "",
                classNum: index,
            });
        });
        let scheduleType;
        switch (parseInt(body["type"])) {
            case 0: {
                scheduleType = scheduleTypes.MIDDLE_SCHOOL;
                break;
            }
            case 1: {
                scheduleType = scheduleTypes.HIGH_SCHOOL;
                break;
            }
            default: {
                reject({errorTitle: "An Error occurred", errorMessage: "Invalid input."});
                return;
            }
        }
        resolve({studentClasses: studentSchedule, type: scheduleType});
    });
};
