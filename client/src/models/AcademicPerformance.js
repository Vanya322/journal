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

    static fromDto(data, group) {
        return new AcademicPerformance(
            data.id,
            Student.fromDto(data.student, group),
            data.date,
            data.performance,
        );
    }
}

export class AcademicPerformanceDto {
    constructor(
        id,
        studentId,
        date,
        performance,
    ) {
        this.id = id;
        this.studentId = studentId;
        this.date = date;
        this.performance = performance;
    }

    static toDto(data) {
        return new AcademicPerformanceDto(
            data.id,
            data.student.id,
            data.date,
            data.performance,
        );
    }
}