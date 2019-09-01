const {generateCal,generateHTML} = require('../js/gen.js');
const studentSchedule = require('./example_student_schedule.json');
const fs = require("fs");
const html = generateHTML(studentSchedule.classes);

fs.writeFile("output.html", html, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

