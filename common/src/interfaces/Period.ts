import {SpecialPeriod} from "..";

export interface Period {
    block: number | SpecialPeriod,
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
