import {SchoolType} from "..";
import {SpecialPeriod} from '..';

export interface Time {
    block: number | SpecialPeriod,
    from: string,
    to: string
}

export interface ConfigurationSchedule {
    [SchoolType.HIGH_SCHOOL]: {
        schedule: {
            [key: string]: number[]
        },
        times: Time[],
    },
    [SchoolType.MIDDLE_SCHOOL]: {
        schedule: {
            [key: string]: number[]
        },
        times: Time[],
    }
}
