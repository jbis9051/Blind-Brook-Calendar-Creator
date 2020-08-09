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
                period: 1,
                from: "08:00",
                to: "08:50"
            },
            {
                period: 2,
                from: "09:00",
                to: "09:50"
            },
            {
                period: 3,
                from: "10:00",
                to: "10:50"
            },
            {
                period: SpecialPeriod.LUNCH,
                from: "11:00",
                to: "11:50"
            },
            {
                period: 4,
                from: "12:00",
                to: "12:50"
            },
            {
                period: 5,
                from: "1:00",
                to: "1:50"
            },
            {
                period: 6,
                from: "2:00",
                to: "2:50"
            }
        ]
    },
    [SchoolType.MIDDLE_SCHOOL]: {
        schedule: scheduleStructure,
        times: [
            {
                period: 1,
                from: "08:00",
                to: "08:50"
            },
            {
                period: 2,
                from: "09:00",
                to: "09:50"
            },
            {
                period: 3,
                from: "10:00",
                to: "10:50"
            },
            {
                period: 4,
                from: "11:00",
                to: "11:50"
            },
            {
                period: SpecialPeriod.LUNCH,
                from: "12:00",
                to: "12:50"
            },
            {
                period: 5,
                from: "1:00",
                to: "1:50"
            },
            {
                period: 6,
                from: "2:00",
                to: "2:50"
            }
        ]
    }
}
