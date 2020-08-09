import { 
    Schedule, 
    SchoolType,
    ConfigurationSchedule,
    Period,
    Class,
    InputClass,
    SpecialPeriod 
} from '@bb-scheduler/common';
 
export function inputToSchedule (school: SchoolType, classes: InputClass[], schedule: ConfigurationSchedule): Schedule {
    return Object.fromEntries(Object.entries(schedule[school].schedule).map(([letter, block]) => {
        const outputClasses: Period[] = [];
        schedule[school].times.forEach((periodObject, periodIndex) => {
            const time = {
                from: periodObject.from,
                to: periodObject.to
            };
            if (periodObject.period === SpecialPeriod.LUNCH || periodObject.period  ===  SpecialPeriod.EXTRA_HELP) {
                outputClasses.push({
                    period: schedule[school].times[periodIndex].period, 
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