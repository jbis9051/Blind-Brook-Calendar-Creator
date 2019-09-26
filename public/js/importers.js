function formatName(name) {
    return name.replace(/(.?)([\/\-])(.?)/g, (match,$1,$2,$3) => { // this is to allow the browser to line break on "/" or "-". It pads it with spaces transforming it into " / ".
        if($1 !== "" && $1 !== " "){ // if its the beginning of the string or it already has a space skip
            $1 = $1 + " ";
        }
        if($3 !== "" && $3 !== " "){ // if its the end of the string or it already has a space skip
            $3 = " " + $3;
        }
        return $1 + $2 + $3;
    }).replace(/Teacher of Record:[^\n\t]*/,''); // when copying and pasting data sometimes the fourth class name will look like this "[classname]Teach of Record: [Teach Last Name, First Name]  ([Date]). This takes that out.
}


function studentScheduleToObject(scheduleString) {
    let classDelimiter;
    let cellDelimiter;
    if (scheduleString.indexOf("\t")) { // <rant> every normal browser who isn't stupid and inconsistent unlike ie and edge.
        classDelimiter = "\n"; // normal
        cellDelimiter = "\t"; // normal
    } else { // ie / edge untested | Why microsoft? Why? I bet this copy method isn't even compatible with excel, a product you make. Did anyone think?</rant>
        classDelimiter = "\n\n"; // wtf
        cellDelimiter = "\n"; // wtf
    }
    const classesArray  = [];
    const classes = scheduleString.split(classDelimiter);
    classes.forEach(aClass => {
        const attributes = aClass.split(cellDelimiter);
        if (!attributes[0].match(/([A-H],?)*[A-H]$/)) { /* if they copied the headers or something else then skip it */
            return;
        }
        if (parseInt(attributes[1]) === 9) { // community service will be the only thing 9th period and it is not included on the schedule so we skip it
            return;
        }
        classesArray.push({
            name: formatName(attributes[4]),
            period: attributes[1],
            days: attributes[0],
            room: attributes[2],
            teacher: attributes[6]
        });
    });
    return classesArray;
}
function teacherScheduleToObject(scheduleString) {
    const classesArray  = [];
    const classes = scheduleString.split("\n");
    classes.forEach(aClass => {
        const attributes = aClass.split("\t");
        if (!attributes[2].match(/([A-H],?)*[A-H]$/)) { /* if they copied the headers or something else then skip it */
            return;
        }
        classesArray.push({
            name: formatName(attributes[5]),
            period: attributes[1],
            days: attributes[2],
            room: attributes[3],
        });
    });
    return classesArray;
}
