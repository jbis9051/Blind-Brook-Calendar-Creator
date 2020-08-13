import React from 'react';
import './ScheduleTable.css';
import {inputToSchedule} from "../helpers/inputToSchedule";
import {
    Class,
    ConfigurationSchedule,
    InputClass,
    Period,
    Schedule,
    SchoolType,
    SpecialPeriod,
    Time
} from "@bb-scheduler/common";

function timeFormat(time: string) {
    let [hour, min] = time.split(":").map(num => parseInt(num));
    if (hour > 12) {
        hour -= 12;
    }
    return `${hour}:${min}`;
}

export interface TableOptions {
    showRoom?: boolean,
    showTeacher?: boolean,
    showFree?: boolean
}

interface ScheduleTableProps {
    inputClasses: InputClass[],
    schoolType: SchoolType,
    schedule: ConfigurationSchedule,
    options: TableOptions
}

export const ScheduleTable: React.FunctionComponent<ScheduleTableProps> = ({inputClasses, schoolType, schedule, options}) => {
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
                {periods.map((period, index) => {
                    if (period.block === SpecialPeriod.LUNCH || period.block === SpecialPeriod.EXTRA_HELP) {
                        if (index !== 0) {
                            return null;
                        }
                        return <td key={index} className={"block long"}
                                   colSpan={Object.keys(scheduleOutput).length}>{period.block === SpecialPeriod.LUNCH ? "LUNCH" : "EXTRA HELP"}</td>
                    }
                    if (period.block === SpecialPeriod.FREE) {
                        return options.showFree ? <td className={"block free"} key={index}>Free</td> : <td className={"block blank"}/>
                    }
                    const aClass = period as Class;
                    return (
                        <td className={"block class"} key={index}>
                            <span className={"class-name"}>{aClass.name}</span>
                            {
                                options.showRoom && aClass.room &&
                                <span className={"class-room"}>{aClass.room}</span>
                            }
                            {
                                options.showTeacher && aClass.teacher &&
                                <span className={"class-teacher"}>{aClass.teacher}</span>
                            }
                        </td>
                    )
                })}
            </tr>
        )
    });

    return (
        <div className={"table-wrapper"}>
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
}
