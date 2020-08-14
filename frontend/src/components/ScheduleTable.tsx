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
    InClassSchedule,
    RemoteSchedule,
    Time
} from "@bb-scheduler/common";
import {colorGenerator} from "../helpers/colorGenerator";

function timeFormat(time: string) {
    let [hour, min] = time.split(":");
    const intHour = parseInt(hour);
    if (intHour > 12) {
        hour = (intHour - 12).toString();
    } else {
        hour = intHour.toString();
    }
    return `${hour}:${min}`;
}

export interface TableOptions {
    showRoom: boolean,
    showTeacher: boolean,
    showFree: boolean,
    showColors: boolean
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

    const otherScheduleTimes = (schedule === InClassSchedule ? RemoteSchedule : InClassSchedule)[schoolType].times;

    const body: React.ReactNode[] = [];

    let index = 0;
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
                        <td style={options.showColors ? {backgroundColor: colorGenerator(aClass.id)}: {}} className={"block class"} key={index}>
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
                <td className={"time"}>{otherScheduleTimes[index] && timeFormat(otherScheduleTimes[index].from)} - {otherScheduleTimes[index] && timeFormat(otherScheduleTimes[index].to)}</td>
            </tr>
        )
        index++;
    });

    return (
        <div className={"table-wrapper"}>
            <table className={"schedule-table"}>
                <thead>
                <tr>
                    <th className={"time-label"}>In Class</th>
                    {Object.keys(scheduleOutput).map(letter =>
                        <th key={letter} className={"letter"}>{letter}</th>
                    )}
                    <th className={"time-label"}>Remote</th>
                </tr>
                </thead>
                <tbody>
                {body}
                </tbody>
            </table>
        </div>
    )
}
