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

    return Object.fromEntries(Object.entries(scheduleStructure).map(([letter, block]) => {
        const outputClasses: Period[] = [];
        scheduleTimes[schedule.school].forEach((periodObject, periodIndex) => {
            const time = {
                from: periodObject.from,
                to: periodObject.to
            };
            if (periodObject.period === SpecialPeriod.LUNCH || periodObject.period  ===  SpecialPeriod.EXTRA_HELP) {
                outputClasses.push({
                    period: scheduleTimes[school][periodIndex].period, 
                    time
                });
            } else {
                const classForAssignedPeriod = schedule.classes.find(schoolClass => {
                    // In order to get the index of the periods, we would need to subtract 1 from the block number
                    return schoolClass.period === block[(periodObject.period as number) - 1] && schoolClass.letterDays.includes(letter);
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