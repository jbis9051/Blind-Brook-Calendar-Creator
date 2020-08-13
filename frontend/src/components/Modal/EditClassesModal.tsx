import React from 'react';
import './EditClassesModal.css';
import {InputClass} from "@bb-scheduler/common";
import {Modal} from "./Modal";
import {Button, ButtonColor} from "../Util/Button";

interface EditClassesModalProps {
    onRemoveClass: (inputClass: InputClass) => void,
    onClear: () => void,
    classes: InputClass[],
    onClose: () => void
}

export const EditClassesModal: React.FunctionComponent<EditClassesModalProps> = ({classes, onRemoveClass, onClose, onClear}) => {
    return (
        <Modal onClose={onClose}>
            <div className={"edit-modal"}>
                <h2 className={"import-title"}>Edit Classes</h2>
                <div className={"edit-button-wrapper"}>
                    <Button fullWidth={true} style={{marginRight: "10px"}} buttonColor={ButtonColor.BAD} onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        if(confirm("Are you sure you want to clear all your classes?")){
                            onClear();
                        }
                    }}>Clear All</Button>
                    <Button fullWidth={true} onClick={onClose}>Done</Button>
                </div>
                <table className={"edit-classes-table"}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Room</th>
                        <th>Teacher</th>
                        <th>Period</th>
                        <th>Letter Days</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classes.map(aClass =>
                        <tr>
                            <td>{aClass.name}</td>
                            <td>{aClass.room}</td>
                            <td>{aClass.teacher}</td>
                            <td>{aClass.period}</td>
                            <td>{aClass.letterDays.join(", ")}</td>
                            <td><Button onClick={() => onRemoveClass(aClass)} buttonColor={ButtonColor.BAD}>X</Button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
