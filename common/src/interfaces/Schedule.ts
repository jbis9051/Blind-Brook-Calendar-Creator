import {InClassSchedule} from '..';
import {Period} from "./Period";

export type Schedule = {
    [key in keyof typeof InClassSchedule]: Period[];
};
