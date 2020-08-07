import {InputClass} from "./InputClass";
import {SchoolType} from "..";

export interface ScheduleInput {
    school: SchoolType
    classes: InputClass[]
}
