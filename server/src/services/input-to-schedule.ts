import { 
    Schedule, 
    ScheduleInput, 
    ConfigurationSchedule,
    ConfigurationTimes,
    Period,
    Class,
    SpecialPeriod 
} from '@bb-scheduler/common';
 
export const inputToSchedule = (schedule: ScheduleInput, scheduleStructure: ConfigurationSchedule, scheduleTimes: ConfigurationTimes): Schedule => {
    const { school, classes } = schedule;
    const classTimes = scheduleTimes[school];

    return Object.fromEntries(Object.entries(scheduleStructure).map(([letter], index) => {
        const outputClasses: Period[] = [];
        const letterDay = Object.keys(scheduleStructure)[index];
        classTimes.forEach((periodObject, periodIndex) => {
            let time = {
                from: classTimes[periodIndex].from,
                to: classTimes[periodIndex].to
            };
            if (periodObject.period === SpecialPeriod.LUNCH || periodObject.period  ===  SpecialPeriod.EXTRA_HELP) {
                outputClasses.push({
                    period: classTimes[periodIndex].period, 
                    time
                });
            } else {
                const classForAssignedPeriod = classes.find(schoolClass => {
                    return schoolClass.period === periodObject.period && schoolClass.letterDays.includes(letterDay);;
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
            }
        });
        return [letter, outputClasses];
    })) as Schedule;
}