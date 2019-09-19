const ical = require('node-ical');

/**
 *
 * @param {String} file
 * @return {Array}
 */
module.exports = (file) => {
    const data = ical.parseFile(file);
    const events = Object.values(data);
    const letter_days = events.filter(e => e['summary'].match(/^[A-H] Day.*/));
    letter_days.map( e => {
       e.letter = e['summary'].charAt(0);
       const formattedStart = insert(insert(e.start,4,"/"),7,"/");
       e.start = new Date(formattedStart);
    });
    return letter_days;
};

//https://stackoverflow.com/a/23196488/7886229
function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}
