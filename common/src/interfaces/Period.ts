import {SpecialPeriod} from "../enums/SpecialPeriod";

export interface Period {
    period: number | SpecialPeriod,
    time: {
        from: string,
        to: string
    }
}

export interface Class extends Period {
    id: number,
    name: string,
    room?: string,
    teacher?: string,
}
