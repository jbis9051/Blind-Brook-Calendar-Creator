import {SchoolType} from "..";
import {SpecialPeriod} from "../enums/SpecialPeriod";

export const InClassTimes = {
    [SchoolType.HIGH_SCHOOL]: [
        {
            period: 1,
            from: "07:50",
            to: "08:43"
        },
        {
            period: 2,
            from: "08:46",
            to: "09:39"
        },
        {
            period: 3,
            from: "09:42",
            to: "10:35"
        },
        {
            period: SpecialPeriod.LUNCH,
            from: "10:38",
            to: "11:31"
        },
        {
            period: 4,
            from: "11:34",
            to: "12:27"
        },
        {
            period: 5,
            from: "12:30",
            to: "13:23"
        },
        {
            period: 6,
            from: "13:26",
            to: "14:19"
        },
        {
            period: SpecialPeriod.EXTRA_HELP,
            from: "14:22",
            to: "14:40"
        }
    ],
    [SchoolType.MIDDLE_SCHOOL]: [
        {
            period: 1,
            from: "07:50",
            to: "08:43"
        },
        {
            period: 2,
            from: "08:46",
            to: "09:39"
        },
        {
            period: 3,
            from: "09:42",
            to: "10:35"
        },
        {
            period: 4,
            from: "10:38",
            to: "11:31"
        },
        {
            period: SpecialPeriod.LUNCH,
            from: "11:34",
            to: "12:27"
        },
        {
            period: 5,
            from: "12:30",
            to: "13:23"
        },
        {
            period: 6,
            from: "13:26",
            to: "14:19"
        },
        {
            period: SpecialPeriod.EXTRA_HELP,
            from: "14:22",
            to: "14:40"
        }
    ]
}
