import {SchoolType} from "..";
import {SpecialPeriod} from '..';

interface Times {
    period: number | SpecialPeriod,
    from: string,
    to: string
}
export interface ConfigurationSchedule { 
    [SchoolType.HIGH_SCHOOL]: {
        schedule: {
            [key: string]: number[]
        },
        times: Times[],
    },
    [SchoolType.MIDDLE_SCHOOL]: {
        schedule: {
            [key: string]: number[]
        },
        times: Times[],
    }
};
