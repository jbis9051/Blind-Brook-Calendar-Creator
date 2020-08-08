import { 
    Schedule, 
    ScheduleInput, 
    InClassSchedule, 
    Period,
    Class,
    InClassTimes, 
    SpecialPeriod 
} from '@bb-scheduler/common';
 
export const inputToSchedule = (schedule: ScheduleInput): Schedule => {
    const { school, classes } = schedule;
    const classTimes = InClassTimes[school];
    return Object.fromEntries(Object.entries(InClassSchedule).map(([letter, blocks], index) => {
        const outputClasses: Period[] = [];
        const letterDay = Object.keys(InClassSchedule)[index];
        let pastLunch = false;
        blocks.forEach((dayPeriod, periodIndex) => {
            let time = {
                from: classTimes[periodIndex].from,
                to: classTimes[periodIndex].to
            };

            if (classTimes[periodIndex].period === SpecialPeriod.LUNCH) {
                const period = classTimes[periodIndex].period;
                outputClasses.push({period, time});
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
                outputClasses.push({
                    period: classForAssignedPeriod.period,
                    name: classForAssignedPeriod.name,
                    room: classForAssignedPeriod.room,
                    teacher: classForAssignedPeriod.teacher,
                    id: classes.indexOf(classForAssignedPeriod),
                    time 
                } as Class);
            } else {
                outputClasses.push({
                    period: SpecialPeriod.FREE,
                    time
                });
            }
        });
        // Activity Period
        outputClasses.push({ 
            period: classTimes[classTimes.length - 1].period, 
            time: { 
                from: classTimes[classTimes.length - 1].from, 
                to: classTimes[classTimes.length - 1].to 
            }
        });
        return [letter, outputClasses];
    })) as Schedule;
}