var express = require('express');
var router = express.Router();

const {generateCal} = require('../ical/src/js/gen.js');

/* GET home page. */
router.get('/',function(req, res, next) {
    res.render('error', {
        errorTitle: "An Error occurred",
        errorMessage: "No data was submitted."
    });
});
router.post('/', function (req, res, next) {
    if(!req.body["names[]"] || !req.body["periods[]"] || !req.body["letters[]"] || !req.body["rooms[]"]){
        res.render('error', {
            errorTitle: "An Error occurred",
            errorMessage: "Missing data."
        });
        return
    }
    if(typeof req.body["names[]"] === "string"){ /* for some stupid reason if only one class is submitted it will submit as a string not an array, this fixes this by putting in an array*/
        req.body["names[]"] = [req.body["names[]"]];
        req.body["periods[]"] = [req.body["periods[]"]];
        req.body["letters[]"] = [req.body["letters[]"]];
        req.body["rooms[]"] = [req.body["rooms[]"]];
    }
    if (req.body["names[]"].length !== req.body["periods[]"].length || req.body["letters[]"].length !== req.body["rooms[]"].length || req.body["rooms[]"].length !== req.body["names[]"].length) {
        res.render('error', {
            errorTitle: "An Error occurred",
            errorMessage: "Unequal input contents. Please try again."
        });
        return;
    }
    if (req.body["letters[]"].some(e => !e.match(/([A-H],?)*[A-H]$/)) || req.body["periods[]"].some(e => e === "" || isNaN(e) || parseInt(e) > 9 || parseInt(e) < 1)) {
        res.render('error', {errorTitle: "An Error occurred", errorMessage: "Invalid input."});
        return;
    }
    const studentClasses = [];
    req.body["names[]"].forEach((val, index) => {
        studentClasses.push({
            name: val,
            "letter-days": req.body["letters[]"][index].split(','),
            room: req.body["rooms[]"][index],
            period: parseInt(req.body["periods[]"][index])
        });
    });
    let ical = "";
    try {
        ical = generateCal(studentClasses);
        res.setHeader('Content-disposition', `attachment; filename=bbcalendar${new Date().getFullYear()}.ics`);
        res.setHeader('Content-type', "text/calendar");
        res.send(ical.toString());
    } catch (e) {
        console.error(e.stack);
        res.render('error', {
            errorTitle: "An Error occurred",
            errorMessage: "An unknown error occurred. Please try again. If the problem persists contact me."
        });
    }
});

module.exports = router;
