import { ConfigurationSchedule } from '..';
import { SchoolType, SpecialPeriod } from '..';

 const scheduleStructure = {
    A: [1, 2, 3, 4, 5, 6],
    B: [3, 4, 5, 6, 7, 8],
    C: [5, 6, 7, 8, 1, 2],
    D: [7, 8, 1, 2, 3, 4],
    E: [3, 4, 5, 6, 7, 8],
    F: [1, 2, 3, 4, 5, 6],
    G: [7, 8, 1, 2, 3, 4],
    H: [5, 6, 7, 8, 1, 2]
}

export const RemoteSchedule: ConfigurationSchedule = {
    [SchoolType.HIGH_SCHOOL]: {
        schedule: scheduleStructure,
        times:[
            {
                block: 1,
                from: "08:00",
                to: "08:50"
            },
            {
                block: 2,
                from: "09:00",
                to: "09:50"
            },
            {
                block: 3,
                from: "10:00",
                to: "10:50"
            },
            {
                block: SpecialPeriod.LUNCH,
                from: "11:00",
                to: "11:50"
            },
            {
                block: 4,
                from: "12:00",
                to: "12:50"
            },
            {
                block: 5,
                from: "13:00",
                to: "13:50"
            },
            {
                block: 6,
                from: "14:00",
                to: "14:50"
            }
        ]
    },
    [SchoolType.MIDDLE_SCHOOL]: {
        schedule: scheduleStructure,
        times: [
            {
                block: 1,
                from: "08:00",
                to: "08:50"
            },
            {
                block: 2,
                from: "09:00",
                to: "09:50"
            },
            {
                block: 3,
                from: "10:00",
                to: "10:50"
            },
            {
                block: 4,
                from: "11:00",
                to: "11:50"
            },
            {
                block: SpecialPeriod.LUNCH,
                from: "12:00",
                to: "12:50"
            },
            {
                block: 5,
                from: "13:00",
                to: "13:50"
            },
            {
                block: 6,
                from: "14:00",
                to: "14:50"
            }
        ]
    }
}
