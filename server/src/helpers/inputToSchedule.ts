import { 
    Schedule, 
    SchoolType,
    ConfigurationSchedule,
    ConfigurationTimes,
    Period,
    InputClass,
    Class,
    SpecialPeriod 
} from '@bb-scheduler/common';
 
export function inputToSchedule (school: SchoolType, classes: InputClass[], scheduleStructure: ConfigurationSchedule, scheduleTimes: ConfigurationTimes): Schedule {
    return Object.fromEntries(Object.entries(scheduleStructure).map(([letter, block]) => {
        const outputClasses: Period[] = [];
        scheduleTimes[school].forEach((periodObject, periodIndex) => {
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
                const classForAssignedPeriod = classes.find(schoolClass => {
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