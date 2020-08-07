import { 
    Schedule, 
    ScheduleInput, 
    Class, 
    Period, 
    InClassSchedule, 
    InClassTimes, 
    SchoolType, 
    SpecialPeriod 
} from '@bb-scheduler/common';
 
export const inputToSchedule = (schedule: ScheduleInput): Schedule => {
    const scheduleObject: Schedule = {
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
    const classTimes = InClassTimes[school as SchoolType];

    days.forEach((day, index) => {
        const letterDay = Object.keys(InClassSchedule)[index];
        day.forEach((dayPeriod, periodIndex) => {
            const classForAssignedPeriod = classes.find(schoolClass => {
                const matchedLetterDay = schoolClass.letterDays.includes(letterDay);
                return schoolClass.period === dayPeriod && matchedLetterDay;
            });

            const { to: timeFrom, from: timeTo } = classTimes[periodIndex];
            
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
                    time: {
                        from: timeFrom,
                        to: timeTo
                    }
                }
                scheduleObject[letterDay as keyof Schedule].push(freeObject);
            }

            const lunchHighSchool = highSchool && periodIndex === 2;
            const lunchMiddleSchool = middleSchool && periodIndex === 3;

            if (lunchHighSchool || lunchMiddleSchool) {
                const { period, from, to } = classTimes[periodIndex + 1];
                scheduleObject[letterDay as keyof Schedule].push({ period, time: { from, to }});
            }
        });
        const { period, from, to } = classTimes[classTimes.length - 1];
        scheduleObject[letterDay as keyof Schedule].push({ period, time: { from, to }});
    });
    return scheduleObject
}