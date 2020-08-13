import {InputClass} from "@bb-scheduler/common";
import {letterDaysTransform} from "./letterDaysTransform";
const letterDayRegex = /([A-H],?)*[A-H]$/;

export function importFromeSchoolData(importDataString: string){
    let classDelimiter: string;
    let cellDelimiter: string;
    if (importDataString.includes("\t")) {
        classDelimiter = "\n";
        cellDelimiter = "\t";
    } else {
        throw 'Unable to detect delimiter. Please copy and paste again.';
    }
    const classes = importDataString.split(classDelimiter).map(aClass => aClass.split(cellDelimiter));
    if (classes.some(attributes => attributes[0] && attributes[0].match(letterDayRegex))) {
        return studentScheduleToObject(classes);
    } else if (classes.some(attributes => attributes[2] && attributes[2].match(letterDayRegex))) {
        return teacherScheduleToObject(classes);
    } else {
        throw 'Unable to detect schedule type. Please copy and paste again.';
    }
}

function formatName(name: string) {
    return name.replace(/(.?)([\/\-])(.?)/g, (match, $1, $2, $3) => { // this is to allow the browser to line break on "/" or "-". It pads it with spaces transforming it into " / ".
        if ($1 !== "" && $1 !== " ") { // if its the beginning of the string or it already has a space skip
            $1 = $1 + " ";
        }
        if ($3 !== "" && $3 !== " ") { // if its the end of the string or it already has a space skip
            $3 = " " + $3;
        }
        return $1 + $2 + $3;
    }).replace(/Teacher of Record:[^\n\t]*/, ''); // when copying and pasting data sometimes the fourth class name will look like this "[classname]Teach of Record: [Teach Last Name, First Name]  ([Date]). This takes that out.
}

function studentScheduleToObject(classes: string[][]): InputClass[] {
    return classes.filter(attributes => {
        return (
            attributes[0]
            && attributes[0].match(letterDayRegex) /* if they copied the headers or something else then skip it */
//            && parseInt(attributes[1]) !== 9 // community service will be the only thing 9th period and it is not included on the schedule so we skip it
        )
    }).map(attributes => ({
        name: formatName(attributes[4]),
        period: parseInt(attributes[1]),
        letterDays:  letterDaysTransform(attributes[0]),
        room: attributes[2],
        teacher: attributes[6]
    }));
}

function teacherScheduleToObject(classes: string[][]): InputClass[] {
    return classes.filter(attributes => {
        return (
            attributes[2]
            && attributes[2].match(letterDayRegex) /* if they copied the headers or something else then skip it */
        )
    }).map(attributes => {
        return ({
            name: formatName(attributes[5]),
            period: parseInt(attributes[1]),
            letterDays: letterDaysTransform(attributes[2]),
            room: attributes[3],
        })
    });
}
