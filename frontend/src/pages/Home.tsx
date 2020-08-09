import React, {useState} from 'react';
import './Home.css';
import {
    ConfigurationSchedule,
    InClassSchedule,
    InputClass,
    Period,
    Schedule,
    SchoolType, SpecialPeriod,
    Time
} from "@bb-scheduler/common";

import {inputToSchedule} from "../helpers/inputToSchedule";

function timeFormat(time: string) {
    let [hour, min] = time.split(":").map(num => parseInt(num));
    if (hour > 12) {
        hour -= 12;
    }
    return `${hour}:${min}`;
}

export const Home: React.FunctionComponent = () => {
    const [inputClasses, setInputClasses] = useState<InputClass[]>([]);
    const [schoolType, setSchoolType] = useState<SchoolType>(SchoolType.HIGH_SCHOOL);
    const [schedule, setSchedule] = useState<ConfigurationSchedule>(InClassSchedule);

    const scheduleOutput: Schedule = inputToSchedule(schoolType, inputClasses, schedule);
    const byTime = new Map<Time, Period[]>();

    schedule[schoolType].times.forEach(time => {
        byTime.set(time, Object.values(scheduleOutput).flatMap(periods =>
            periods.filter(period => period.time.from === time.from && period.time.to === time.to)
        ));
    })

    const body: React.ReactNode[] = [];

    byTime.forEach((periods, time) => {
        body.push(
            <tr key={time.from}>
                <td className={"time"}>{timeFormat(time.from)} - {timeFormat(time.to)}</td>
                {periods.map((period,index) => {
                    if(period.block === SpecialPeriod.LUNCH || period.block === SpecialPeriod.EXTRA_HELP){
                        if(index !== 0){
                            return null;
                        }
                        return <td key={index} colSpan={Object.keys(scheduleOutput).length}>{period.block === SpecialPeriod.LUNCH ? "LUNCH" : "EXTRA HELP"}</td>
                    }
                    if(period.block === SpecialPeriod.FREE){
                        return <td key={index}>Free</td>
                    }
                })}
            </tr>
        )
    });

    return (
        <div>
            <div className={"school-selector"}>
                <span onClick={() => setSchoolType(SchoolType.HIGH_SCHOOL)}
                      className={"school-switch " + (schoolType === SchoolType.HIGH_SCHOOL && "selected")}>High School</span>
                <span onClick={() => setSchoolType(SchoolType.MIDDLE_SCHOOL)}
                      className={"school-switch " + (schoolType === SchoolType.MIDDLE_SCHOOL && "selected")}>Middle School</span>
            </div>
            <table>
                <thead>
                <tr>
                    <th/> {/*this is to accommodate the times*/}
                    {Object.keys(scheduleOutput).map(letter =>
                        <th key={letter} className={"letter"}>{letter}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {body}
                </tbody>
            </table>
        </div>
    )
};
