import React from 'react';
import './AddClassModal.css';
import {InputClass} from "@bb-scheduler/common";
import {useForm} from 'react-hook-form';
import {Modal} from "./Modal";
import {Button, ButtonColor} from "../Util/Button";
import {letterDaysTransform} from "../../helpers/letterDaysTransform";

interface AddClassModalProps {
    onAddClass: (inputClass: InputClass) => void,
    onClose: () => void
}

interface SubmitData {
    className: string,
    period: string,
    letterDay: string,
    room: string,
    teacher: string
}

export const AddClassModal: React.FunctionComponent<AddClassModalProps> = ({onAddClass, onClose}) => {
    const {register, handleSubmit, reset, errors} = useForm({mode: 'onChange'});
    const onSubmit = (data: SubmitData) => {
        onAddClass({
            name: data.className,
            period: parseInt(data.period),
            letterDays: data.letterDay.split(",").map(letter => letter.trim()),
            room: data.room || undefined,
            teacher: data.teacher || undefined,
        });
        onClose();
    };

    function letterDayValidation(val: string) {
        if(!letterDaysTransform(val).every(val => val.match(/[A-H]/))){
            return "Enter valid letters A-H using commas (e.g A,C,D,F,G)";
        }
        return true;
    }

    function errorMaker(val: any | undefined){
        if(!val){
            return null;
        }
        return <span className={"error"}>{val.message}</span>
    }

    return (
        <Modal onClose={onClose}>
            <div className={"add-class-modal"}>
                <h2 className={"add-class-title"}>Add Class</h2>
                <form className={"standard-form"} onSubmit={handleSubmit<SubmitData>(onSubmit)}>
                    {errorMaker(errors.className)}
                    <input name={"className"} placeholder={"Class Name"} ref={register({required: 'Class Name Required'})}/>
                    {errorMaker(errors.period)}
                    <input type={"text"} name={"period"} placeholder={"Period"}
                           ref={register({required: 'Period required (1-8)', min: {value: 1, message: 'Enter a number 1-8'}, max: {value: 8, message: 'Enter a number 1-8'}})}/>
                    {errorMaker(errors.letterDay)}
                    <input name={"letterDay"} placeholder={"Letter Days (e.g 'A,C,D,F,G,H')"}
                           ref={register({required: 'Letter Days required', validate: letterDayValidation})}/>
                    <input name={"room"} placeholder={"Room (Optional)"} ref={register}/>
                    <input name={"teacher"} placeholder={"Teacher (Optional)"} ref={register}/>
                    <div className={"add-class-button-wrapper"}>
                        <Button fullWidth={true} style={{marginRight: "10px"}} onClick={onClose} buttonColor={ButtonColor.BAD} type={"button"}>Cancel</Button>
                        <Button fullWidth={true} type={"submit"}>Add</Button>
                    </div>
                 </form>
            </div>
        </Modal>
    );
}
