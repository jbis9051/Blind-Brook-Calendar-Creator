import React from 'react';
import './AddClassModal.css';
import '../Standards.css';
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
        <Modal onClose={onClose}>
            <div className={"add-class-modal"}>
                <h2 className={"title"}>Add Class</h2>
                <form className={"standard-form"} onSubmit={handleSubmit(onSubmit)}>
                    {errors.className && <span className={"error"}>Class name required</span>}
                    <input name={"className"} placeholder={"Class Name"} ref={register({required: true})}/>
                    {errors.period && <span className={"error"}>Period required (1-8)</span>}
                    <input type={"number"} min={1} max={8} name={"period"} placeholder={"Period"}
                           ref={register({required: true, min: 1, max: 8})}/>
                    {errors.letterDay && <span className={"error"}>Enter valid letters A-H using commas (e.g A,C,D,F,G)</span>}
                    <input name={"letterDay"} placeholder={"Letter Days (e.g 'A,C,D,F,G,H'"}
                           ref={register({required: true, validate: letterDayValidation})}/>
                    <input name={"room"} placeholder={"Room (Optional)"} ref={register}/>
                    <input name={"teacher"} placeholder={"Teacher (Optional)"} ref={register}/>
                    <div className={"std-button-wrapper"}>
                        <button onClick={onClose} className={"button bad"} type={"button"}>Cancel</button>
                        <button className={"button"} type={"submit"}>Add</button>
                    </div>
                 </form>
            </div>
        </Modal>
    );
}
