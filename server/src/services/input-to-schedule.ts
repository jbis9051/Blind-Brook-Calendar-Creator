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

            const { from, to } = classTimes[periodIndex];
            let classToAdd: Period | Class;

            if (classForAssignedPeriod) {
                const id = classes.indexOf(classForAssignedPeriod);
                const { period, name, room, teacher } = classForAssignedPeriod;
                classToAdd = { period, name, room, teacher, id, time: { from, to } };
            } else {
                classToAdd = {
                    period: SpecialPeriod.FREE,
                    time: { from, to }
                }
            }

            scheduleObject[letterDay as keyof Schedule].push(classToAdd);

            const lunchHighSchool = highSchool && periodIndex === 2;
            const lunchMiddleSchool = middleSchool && periodIndex === 3;

            if (lunchHighSchool || lunchMiddleSchool) {
                const { period, from, to } = classTimes[periodIndex + 1];
                scheduleObject[letterDay as keyof Schedule].push({period, time: { from, to }});
            }
        });
        const { period, from, to } = classTimes[classTimes.length - 1];
        scheduleObject[letterDay as keyof Schedule].push({ period, time: { from, to }});
    });
    return scheduleObject
}