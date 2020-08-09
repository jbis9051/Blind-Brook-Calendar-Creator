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
            if (periodObject.block === SpecialPeriod.LUNCH || periodObject.block  ===  SpecialPeriod.EXTRA_HELP) {
                outputClasses.push({
                    block: schedule[school].times[periodIndex].block,
                    time
                });
            } else {
                const classForAssignedPeriod = classes.find(schoolClass => {
                    return schoolClass.period === block[(periodObject.block as number) - 1] && schoolClass.letterDays.includes(letter);
                });
                if (classForAssignedPeriod) {
                    outputClasses.push({
                        block: classForAssignedPeriod.period,
                        name: classForAssignedPeriod.name,
                        room: classForAssignedPeriod.room,
                        teacher: classForAssignedPeriod.teacher,
                        id: classes.indexOf(classForAssignedPeriod),
                        time
                    } as Class);
                } else {
                    outputClasses.push({
                        block: SpecialPeriod.FREE,
                        time
                    });
                }
            }
        });
        return [letter, outputClasses];
    })) as Schedule;
}
