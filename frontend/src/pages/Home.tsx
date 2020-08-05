import React, {useState} from 'react';
import './Home.css';
import {SchoolType} from "@bb-scheduler/common";

export const Home: React.FunctionComponent = () => {
    const [schoolType, setSchoolType] = useState(SchoolType.HIGH_SCHOOL);

    return (
        <div className={"import-wrapper"}>
            <div className={"import-container"}>
                <textarea placeholder={"Paste Data"} className={"import-input"}/>
                <video playsInline autoPlay loop muted className={"import-data-how-to"}/>
            </div>
            <div className={"school-selector"}>
                <span onClick={() => setSchoolType(SchoolType.HIGH_SCHOOL)} className={"school-switch " + (schoolType === SchoolType.HIGH_SCHOOL && "selected")}>High School</span>
                <span onClick={() => setSchoolType(SchoolType.MIDDLE_SCHOOL)} className={"school-switch " + (schoolType === SchoolType.MIDDLE_SCHOOL && "selected")}>Middle School</span>
            </div>
            <button className="standard-button" id="import-button">Import</button>
        </div>
    );
}
