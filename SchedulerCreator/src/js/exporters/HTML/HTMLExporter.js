const cheerio = require("cheerio");

module.exports = (timedScheduleObject) => {
    const $ = cheerio.load(`<table><thead><tr><th></th></tr></thead><tbody></tbody></table>`);
    const letters = Object.keys(timedScheduleObject);
    letters.forEach(day => {
        $('table thead tr').append(`<th class="letter">${day}</th>`);
    });
    const numOfClasses = Object.values(timedScheduleObject)[0].length;
    const colors = ["tomato", "dodgerblue", "yellow", "orange", "mediumseagreen", "lightblue", "pink", "#d6ff99", "gainsboro", "#FAE7B5", "#a89de1", "burlywood"]
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
                    let classCode = `<td class="class"><span class="name">${theClass.name}</span>`;
                    if (theClass.room) {
                        classCode += `<span class="room">${theClass.room}</span>`;
                    }
                    if (theClass.teacher) {
                        classCode += `<span class="teacher">${theClass.teacher}</span>`;
                    }
                    if (theClass.color) {
                        if(colors[i]) {
                            document.getElementsByClassName("class").style.backgroundColor = colors
                        } else {
                            let color = []
                            for (_= 0;_<3;_++) {
                                color.push(Math.floor(Math.random() * 255))
                            }
                            document.getElementsByClassName("class").style.backgroundColor = "rgba(" + color[0] + "," + color[1] + "," + color[2] + ", .5)"
                            // In the case that all of the colors are used, the program would generate a new color with a light opacity in order for the class to be readable
                        }
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
