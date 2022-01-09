import { Student } from "./Student";

export class AcademicPerformance {
    constructor(
        id,
        student,
        date,
        performance,
    ) {
        this.id = id;
        this.student = student;
        this.date = date;
        this.performance = performance;
    }

    static async fromDto(data) {
        return new AcademicPerformance(
            data.id,
            Student.fromDto(data.student),
            data.date,
            data.performance,
        );
    }
}