import React, {useState} from 'react';
import './Create.css';
import '../components/Standards.css';
import {ConfigurationSchedule, InClassSchedule, InputClass, SchoolType} from "@bb-scheduler/common";
import {ScheduleTable} from "../components/ScheduleTable";
import {Modal} from "../components/Modal/Modal";
import {AddClassModal} from "../components/Modal/AddClassModal";

export const Create: React.FunctionComponent = () => {
    const [inputClasses, setInputClasses] = useState<InputClass[]>([]);
    const [schoolType, setSchoolType] = useState<SchoolType>(SchoolType.HIGH_SCHOOL);
    const [schedule, setSchedule] = useState<ConfigurationSchedule>(InClassSchedule);
    const [addClassModelOpen, setAddClassModelOpen] = useState(false);

    return (
        <div className={"create-wrapper"}>
            <div className={"button-wrapper"}>
                <button className={"button"}>Edit Classes</button>
                <div>
                    <button className={"button add"}>Import Classes</button>
                    <button onClick={() => setAddClassModelOpen(true)} className={"button add"}>Add Class</button>
                </div>
            </div>
            <div className={"school-selector"}>
                        <span onClick={() => setSchoolType(SchoolType.HIGH_SCHOOL)}
                              className={"school-switch " + (schoolType === SchoolType.HIGH_SCHOOL && "selected")}>High School</span>
                <span onClick={() => setSchoolType(SchoolType.MIDDLE_SCHOOL)}
                      className={"school-switch " + (schoolType === SchoolType.MIDDLE_SCHOOL && "selected")}>Middle School</span>
            </div>
            <ScheduleTable inputClasses={inputClasses} schoolType={schoolType} schedule={schedule}/>
            {
                addClassModelOpen &&
                    <AddClassModal onAddClass={() => {}} onClose={() => setAddClassModelOpen(false)}/>
            }
        </div>
    )
};
