import { 
    Schedule, 
    ScheduleInput, 
    InClassSchedule, 
    InClassTimes, 
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
    const classTimes = InClassTimes[school];

    days.forEach((day, index) => {
        const letterDay = Object.keys(InClassSchedule)[index];
        const classesForLetterDay = [];
        let pastLunch = false;
        day.forEach((dayPeriod, periodIndex) => {
            let time = {
               from: classTimes[periodIndex].from,
               to: classTimes[periodIndex].to
            };

            if (classTimes[periodIndex].period === SpecialPeriod.LUNCH) {
                const period = classTimes[periodIndex].period;
                classesForLetterDay.push({period, time});
                pastLunch = true;
            }

            if (pastLunch) {
                 time = {
                    // to account for lunch, we need to offset the index by one
                    from: classTimes[periodIndex + 1].from,
                    to: classTimes[periodIndex + 1].to
                 };
            }

            const classForAssignedPeriod = classes.find(schoolClass => {
                return schoolClass.period === dayPeriod && schoolClass.letterDays.includes(letterDay);;
            });
            
            if (classForAssignedPeriod) {
                if (classForAssignedPeriod) {
                    classesForLetterDay.push({
                         period: classForAssignedPeriod.period,
                         name: classForAssignedPeriod.name,
                         room: classForAssignedPeriod.room,
                         teacher: classForAssignedPeriod.teacher,
                         id: classes.indexOf(classForAssignedPeriod),
                         time 
                    });
                }
            } else {
                classesForLetterDay.push({
                    period: SpecialPeriod.FREE,
                    time
                });
            }
        });
        // Activity Period
        classesForLetterDay.push({ 
            period: classTimes[classTimes.length - 1].period, 
            time: { 
                from: classTimes[classTimes.length - 1].from, 
                to: classTimes[classTimes.length - 1].to 
            }
        });

        scheduleObject[letterDay as keyof Schedule] = classesForLetterDay;
    });
    return scheduleObject
}