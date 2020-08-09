import { ScheduleInput, SchoolType } from '@bb-scheduler/common';
export const mockSchedule: ScheduleInput = {
    school: SchoolType.HIGH_SCHOOL,
    classes: [
       {
          name: "Honors Algebra II/Trigonometry",
          letterDays: ["A", "C", "D", "F", "G", "H"],
          period: 1,
          room: "H102",
          teacher: "Seeger"
       },
       {
          name: "Honors Computer Science",
          letterDays: ["A", "C", "D", "F", "G", "H"],
          period: 2,
          room: "H206",
          teacher: "Kraeger"
       },
       {
          name: "English 10",
          letterDays: ["A", "B", "D", "E", "F", "G"],
          period: 3,
          room: "H221",
          teacher: "Colangelo"
       },
       {
          name: "Honors Chemistry",
          letterDays: ["A", "B", "D", "E", "F", "G"],
          period: 4,
          room: "H218",
          teacher: "Sugantino"
       },
       {
          name: "Honors Chemistry Lab",
          letterDays: ["A", "C", "E"],
          period: 5,
          room: "H218",
          teacher: "Sugantino"
       },
       {
          name: "Health",
          letterDays: ["B", "F", "H"],
          period: 5,
          room: "H108",
          teacher: "Carlone"
       },
       {
          name: "Honors Spanish 3",
          letterDays: ["A", "B", "C", "E", "F", "H"],
          period: 6,
          room: "H219",
          teacher: "Nacher"
       },
       {
          name: "Tactical Sports",
          letterDays: ["B", "D", "H"],
          period: 7,
          room: "H GYM",
          teacher: "Beatty"
       },
       {
          name: "Digital Photography",
          letterDays: ["C", "E", "G"],
          period: 7,
          room: "H210B",
          teacher: "Buonocore"
       },
       {
          name: "Global History",
          letterDays: ["B", "C", "D", "E", "G", "H"],
          period: 8,
          room: "H205",
          teacher: "Lewis"
       },
       {
          name: "Community Service 10",
          letterDays: ["A", "B", "C", "D", "F", "G"],
          period: 9,
          room: "H103",
          teacher: "Romm"
       },
    ]
 } 