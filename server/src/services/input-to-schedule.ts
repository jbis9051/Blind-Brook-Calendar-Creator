import { 
    Schedule, 
    ScheduleInput, 
    Class, Period, 
    InClassSchedule, 
    InputClass, 
    InClassTimes, 
    SchoolType, 
    SpecialPeriod 
} from '@bb-scheduler/common';
 
export const inputToSchedule = (schedule: ScheduleInput): Schedule => {
    let scheduleObject: Schedule = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: []
    };
    const { school, classes } = schedule;
    const highSchool = schedule.school === SchoolType.HIGH_SCHOOL;
    const middleSchool = schedule.school === SchoolType.MIDDLE_SCHOOL;
    const days = Object.values(InClassSchedule);
    
    days.forEach((day, index) => {
        const letterDay = Object.keys(InClassSchedule)[index];
        day.forEach((dayPeriod, periodIndex) => {
            const classForAssignedPeriod = (classes as InputClass[]).find(schoolClass => {
                const matchedLetterDay = schoolClass.letterDays.includes(letterDay);
                return schoolClass.period === dayPeriod && matchedLetterDay;
            }) as InputClass;

            const periodTimes = InClassTimes[school as SchoolType].find(periodAndTimes => periodAndTimes.period === dayPeriod);
            const timeFrom = periodTimes?.from as string;
            const timeTo = periodTimes?.to as string;
            
            if (classForAssignedPeriod) {
                const id = classes.indexOf(classForAssignedPeriod);
                const { period, name, room, teacher } = classForAssignedPeriod;
                const classObject: Class = {
                    period,
                    name,
                    time: {
                        from: timeFrom,
                        to: timeTo
                    },
                    id,
                    room,
                    teacher
                }
                scheduleObject[letterDay as keyof Schedule].push(classObject);
            } else {
                const freeObject: Period = {
                    period: SpecialPeriod.FREE,
                    name: "Free",
                    time: {
                        from: timeFrom,
                        to: timeTo
                    }
                }
                scheduleObject[letterDay as keyof Schedule].push(freeObject);
            }

            const lunchHighSchool = highSchool && periodIndex === 2;
            const lunchMiddleSchool = middleSchool && periodIndex === 3;
            const extraHelp = periodIndex === 5;

            if (lunchHighSchool || lunchMiddleSchool) {
                const lunchTime = highSchool ? { from: "10:38", to: "11:31" } : { from: "11:34", to: "12:27" }
                const lunchObject: Period = {
                    period: SpecialPeriod.LUNCH,
                    name: "Lunch",
                    time: lunchTime,
                }
                scheduleObject[letterDay as keyof Schedule].push(lunchObject);
            }
            if (extraHelp) {
                const helpObject: Period = {
                    period: SpecialPeriod.EXTRA_HELP,
                    name: "Help",
                    time: {
                        from: "2:22",
                        to: "2:40"
                    }
                }
                scheduleObject[letterDay as keyof Schedule].push(helpObject);
            }
        });
    })
    return scheduleObject
}