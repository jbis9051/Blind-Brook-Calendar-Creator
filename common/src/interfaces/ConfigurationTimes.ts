import {SchoolType} from "..";
import {SpecialPeriod} from '../enums/..';

interface Times {
    period: number | SpecialPeriod,
    from: string,
    to: string
}

export interface ConfigurationTimes { 
    [SchoolType.HIGH_SCHOOL]: Times[],
    [SchoolType.MIDDLE_SCHOOL]: Times[]
};
