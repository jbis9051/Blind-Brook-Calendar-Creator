import {SchoolType} from "..";
import {SpecialPeriod} from "../enums/SpecialPeriod";
import {ConfigurationTimes} from "../interfaces/ConfigurationTimes";

export const RemoteTimes: ConfigurationTimes = {
    [SchoolType.HIGH_SCHOOL]: [
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
    ],
    [SchoolType.MIDDLE_SCHOOL]: [
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
            from: "12:00",
            to: "12:50"
        },
        {
            period: SpecialPeriod.LUNCH,
            from: "11:00",
            to: "11:50"
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
