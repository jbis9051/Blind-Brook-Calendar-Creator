const cheerio = require("cheerio");
const colorsLength = require("./constants/colors.js").length;

module.exports = (timedScheduleObject) => {
    const $ = cheerio.load(`<table><thead><tr><th></th></tr></thead><tbody></tbody></table>`);
    const letters = Object.keys(timedScheduleObject);
    letters.forEach(day => {
        $('table thead tr').append(`<th class="letter">${day}</th>`);
    });
    const numOfClasses = Object.values(timedScheduleObject)[0].length;
    for (let i = 0; i < numOfClasses; i++) {
        const row = cheerio.load(`<table><tbody><tr></tr></tbody></table>`);
        row('tr').append(`<td class="time">${timeFormat(timedScheduleObject["A"][i].from)} - ${timeFormat(timedScheduleObject["A"][i].to)}</td>`);
        getClassListByIndex(timedScheduleObject, i).forEach((obj, index) => {
            const theClass = obj.classes[0];
            let special = false;
            if (obj.period === "lunch") {
                special = `<td colspan="${letters.length}" class="lunch printable-show-background-color">LUNCH</td>`;
            }
            if (obj.period === "extra help") {
                special = `<td colspan="${letters.length}">EXTRA HELP</td>`;
            }
            if (special) {
                if (index === 0) { // only do it once, no need to have 8 lunches
                    row('tr').append(special);
                }
            } else {
                if (theClass === null) {
                    row('tr').append(`<td class="free"><span class="free-text">FREE</span></td>`);
                } else {
                    let classCode = `<td class="class color printable-show-background-color" data-index="${theClass.classNum % colorsLength /* we mod this incase we don't have another color it will loop */}"><span class="name">${theClass.name}</span>`;
                    if (theClass.room) {
                        classCode += `<span class="room">${theClass.room}</span>`;
                    }
                    if (theClass.teacher) {
                        classCode += `<span class="teacher">${theClass.teacher}</span>`;
                    }
                    row('tr').append(classCode + `</td>`);
                }
            }
        });
        $('table tbody').append(row('table tbody').html());
    }
    return $('body').html();
};

function getClassListByIndex(timedScheduleObject, index) {
    const classLists = [];
    Object.values(timedScheduleObject).forEach(order => classLists.push(order[index]));
    return classLists;
}

function timeFormat(time) {
    let [hour, min] = time.split(":");
    hour = parseInt(hour);
    min = parseInt(min);
    if (hour > 12) {
        hour -= 12;
    }
    return `${hour}:${min}`;
}
