import React, {useEffect, useState} from 'react';
import './Home.css';
import {SchoolType} from "@bb-scheduler/common";

export const Home: React.FunctionComponent = () => {
    const [schoolType, setSchoolType] = useState<SchoolType | null>(SchoolType.HIGH_SCHOOL);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [importValue, setImportValue] = useState("");

    useEffect(() => {
        if(!importValue){
            return;
        }
    }, [importValue])

    return (
        <div className={"import-wrapper"}>
            <h1 className={"home-title"}>Import Schedule</h1>
            {showNextButton &&
                <button className="standard-button">Next</button>
            }
            <div className={"school-selector"}>
                <span onClick={() => setSchoolType(SchoolType.HIGH_SCHOOL)} className={"school-switch " + (schoolType === SchoolType.HIGH_SCHOOL && "selected")}>High School</span>
                <span onClick={() => setSchoolType(SchoolType.MIDDLE_SCHOOL)} className={"school-switch " + (schoolType === SchoolType.MIDDLE_SCHOOL && "selected")}>Middle School</span>
            </div>
            {errorMessage &&
                <span className={"error"}>{errorMessage}</span>
            }
            <div className={"import-container"}>
                <textarea value={importValue} onChange={(e) => setImportValue(e.target.value)} placeholder={"Paste Data"} className={"import-input"}/>
                <video playsInline autoPlay loop muted className={"import-data-how-to"}/>
            </div>
            <button onClick={() => setShowHelp(!showHelp)} className={"standard-button help-button"}>Help</button>
            {
                showHelp &&
                    <ol>
                        <li>Select your school type above</li>
                        <li>Sign Into to <a target={"_blank"} rel={"noopener noreferrer"} href={"https://esdparentportal.lhric.org"}>https://esdparentportal.lhric.org</a></li>
                        <li>Navigate to the "Schedule" tab.</li>
                        <li>Copy and Paste your schedule into the box above</li>
                        <li>Click "Import"</li>
                    </ol>
            }
        </div>
    );
}
