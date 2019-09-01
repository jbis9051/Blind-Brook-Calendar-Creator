var express = require('express');
var router = express.Router();

const {generateHTML} = require('../ical/src/js/gen.js');

const error =  (title,message) => ` <h1>${title}</h1><p>${message}</p>`;

/* GET home page. */
router.get('/',function(req, res, next) {
    res.send(error("An Error occurred", "No data was submitted."));
});
router.post('/', function (req, res, next) {
    if(!req.body["names[]"] || !req.body["periods[]"] || !req.body["letters[]"] || !req.body["rooms[]"]){
        res.send(error("An Error occurred", "Missing Data"));
        return;
    }
    if(typeof req.body["names[]"] === "string"){ /* for some stupid reason if only one class is submitted it will submit as a string not an array, this fixes this by putting in an array */
        req.body["names[]"] = [req.body["names[]"]];
        req.body["periods[]"] = [req.body["periods[]"]];
        req.body["letters[]"] = [req.body["letters[]"]];
        req.body["rooms[]"] = [req.body["rooms[]"]];
    }
    if (req.body["names[]"].length !== req.body["periods[]"].length || req.body["letters[]"].length !== req.body["rooms[]"].length || req.body["rooms[]"].length !== req.body["names[]"].length) {
        res.send(error("An Error occurred", "Unequal input contents. Please try again."));
        return;
    }
    if (req.body["letters[]"].some(e => !e.match(/([A-H],?)*[A-H]$/)) || req.body["periods[]"].some(e => e === "" || isNaN(e) || parseInt(e) > 9 || parseInt(e) < 1)) {
        res.send(error("An Error occurred", "Invalid input"));
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
    try {
        const html = generateHTML(studentClasses);
        res.send(html);
    } catch (e) {
        console.error(e.stack);
        res.send(error("An Error occurred", "An unknown error occurred. Please try again. If the problem persists contact me."));
    }
});

module.exports = router;
