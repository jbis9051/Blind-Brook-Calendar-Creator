import React, {useEffect, useState} from 'react';
import './Create.css';
import {ConfigurationSchedule, InClassSchedule, InputClass, Schedule, SchoolType} from "@bb-scheduler/common";
import {ScheduleTable} from "../components/ScheduleTable";
import {AddClassModal} from "../components/Modal/AddClassModal";
import {Button} from "../components/Util/Button";
import {ImportClassesModal} from "../components/Modal/ImportClassesModal";
import {EditClassesModal} from "../components/Modal/EditClassesModal";
import {inputToSchedule} from "../helpers/inputToSchedule";

export const Create: React.FunctionComponent = () => {
    const [inputClasses, setInputClasses] = useState<InputClass[]>([]);
    const [schoolType, setSchoolType] = useState<SchoolType>(SchoolType.HIGH_SCHOOL);
    const [schedule, setSchedule] = useState<ConfigurationSchedule>(InClassSchedule);
    const [addClassModelOpen, setAddClassModelOpen] = useState(false);
    const [importClassesModelOpen, setImportClassesModelOpen] = useState(false);
    const [editClassesModalOpen, setEditClassesModalOpen] = useState(false);

    useEffect(() => {
        const savedInputClassesString = window.localStorage.getItem("bb-schedule-save");
        if(!savedInputClassesString){
            return;
        }
        try {
            const savedInputClasses: {type: SchoolType, classes: InputClass[]} = JSON.parse(savedInputClassesString);
            const scheduleOutput: Schedule = inputToSchedule(savedInputClasses.type, savedInputClasses.classes, InClassSchedule); // if it works, then we assume its good, cause im too lazy for validation
            setInputClasses(savedInputClasses.classes)
            setSchoolType(savedInputClasses.type);
        } catch (e) {}
    }, []);

    useEffect(() => {
        window.localStorage.setItem("bb-schedule-save", JSON.stringify({type: schoolType, classes: inputClasses}))
    }, [inputClasses, schoolType]);

    return (
        <div className={"create-wrapper"}>
            <div className={"create-button-wrapper"}>
                <Button  onClick={() => setEditClassesModalOpen(true)} >Edit Classes</Button>
                <div>
                    <Button onClick={() => setImportClassesModelOpen(true)} style={{marginRight: "10px"}}>Import Classes</Button>
                    <Button onClick={() => setAddClassModelOpen(true)}>Add Class</Button>
                </div>
            </div>
            <div className={"school-selector"}>
                        <span onClick={() => setSchoolType(SchoolType.HIGH_SCHOOL)}
                              className={"school-switch " + (schoolType === SchoolType.HIGH_SCHOOL && "selected")}>High School</span>
                <span onClick={() => setSchoolType(SchoolType.MIDDLE_SCHOOL)}
                      className={"school-switch " + (schoolType === SchoolType.MIDDLE_SCHOOL && "selected")}>Middle School</span>
            </div>
            <ScheduleTable inputClasses={inputClasses} schoolType={schoolType} schedule={schedule} options={{showFree: true}}/>
            {
                addClassModelOpen &&
                <AddClassModal onAddClass={(inputClass) => setInputClasses([...inputClasses, inputClass])} onClose={() => setAddClassModelOpen(false)}/>
            }
            {
                importClassesModelOpen &&
                <ImportClassesModal onImportClasses={(inputClasses) => setInputClasses(inputClasses)} onClose={() => setImportClassesModelOpen(false)}/>
            }
            {
                editClassesModalOpen &&
                <EditClassesModal onClear={() => setInputClasses([])} classes={inputClasses} onRemoveClass={(aClass: InputClass) => setInputClasses(inputClasses.filter(oneClass => oneClass !== aClass))} onClose={() => setEditClassesModalOpen(false)}/>
            }
        </div>
    )
};
