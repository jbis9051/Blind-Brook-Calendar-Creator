import React from 'react';
import './AddClassModal.css';
import {InputClass} from "@bb-scheduler/common";
import {useForm} from 'react-hook-form';
import {Modal} from "./Modal";

interface AddClassModalProps {
    onAddClass: (inputClass: InputClass) => void,
    onClose: () => void
}

export const AddClassModal: React.FunctionComponent<AddClassModalProps> = ({onAddClass, onClose}) => {
    const {register, handleSubmit, reset, errors} = useForm();
    const onSubmit = (data: any) => console.log(data);

    function letterDayValidation(val: string) {
        return val.split(",").map(val => val.trim()).every(val => val.match(/[A-H]/));
    }

    return (
        <Modal>
            <div className={"add-class-modal"}>
                <form className={"standard-form"} onSubmit={handleSubmit(onSubmit)}>
                    <input name={"className"} placeholder={"Class Name"} ref={register({required: true})}/>
                    {errors.className && <span>Class name required</span>}
                    <input type={"number"} min={1} max={1} name={"period"} placeholder={"Period"}
                           ref={register({required: true, min: 1, max: 1})}/>
                    {errors.period && <span>Period required</span>}
                    <input name={"letterDay"} placeholder={"Letter Days (e.g 'A,C,D,F,G,H'"}
                           ref={register({required: true, validate: letterDayValidation})}/>
                    {errors.letterDay && <span>Enter valid letters A-H using commas (e.g A,C,D,F,G)</span>}
                    <input name={"room"} placeholder={"Room (Optional)"} ref={register}/>
                    <input name={"teacher"} placeholder={"Teacher (Optional)"} ref={register}/>
                    <button className={"standard-button add"} type={"submit"}>Add</button>
                </form>
            </div>
        </Modal>
    );
}
