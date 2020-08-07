import { 
    Schedule, 
    ScheduleInput, 
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
    const days = Object.values(InClassSchedule);
    const classTimes = InClassTimes[school as SchoolType];

    days.forEach((day, index) => {
        const letterDay = Object.keys(InClassSchedule)[index];
        const classesForLetterDay = [];
        let pastLunch = false;
        day.forEach((dayPeriod, periodIndex) => {
            let { from, to } = classTimes[periodIndex];
            let time = { from, to };

            if (classTimes[periodIndex].period === SpecialPeriod.LUNCH) {
                const period = classTimes[periodIndex].period;
                classesForLetterDay.push({period, time});
                pastLunch = true;
            }

            if (pastLunch) {
                ({ from, to } = classTimes[periodIndex + 1]);
                (time = { from, to });
            }

            const classForAssignedPeriod = classes.find(schoolClass => {
                const matchedLetterDay = schoolClass.letterDays.includes(letterDay);
                return schoolClass.period === dayPeriod && matchedLetterDay;
            });
            
            if (classForAssignedPeriod) {
                const id = classes.indexOf(classForAssignedPeriod);
                const { period, name, room, teacher } = classForAssignedPeriod;
                classesForLetterDay.push({ period, name, room, teacher, id, time });
            } else {
                classesForLetterDay.push({
                    period: SpecialPeriod.FREE,
                    time
                });
            }
        });
        //Activity Period
        const { period, from, to } = classTimes[classTimes.length - 1];
        classesForLetterDay.push({ period, time: { from, to }});

        scheduleObject[letterDay as keyof Schedule] = classesForLetterDay;
    });
    return scheduleObject
}