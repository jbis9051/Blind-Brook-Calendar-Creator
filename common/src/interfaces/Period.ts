import {SpecialPeriod} from "../enums/SpecialPeriod";

export interface Period {
    period: number | SpecialPeriod,
    name: string,
    time: {
        from: string,
        to: string
    }
}

export interface Class extends Period {
    id: number,
    room?: string,
    teacher?: string,
}
