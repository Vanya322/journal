import studentsModel from "../db-models/Student";
import { Student } from "./Student";

export class AcademicPerformanceDto {
    constructor(
        student,
        date,
        performance,
    ) {
        this.student = student;
        this.date = date;
        this.performance = performance;
    }

    static async toDto(data) {
        const allStudents = await studentsModel.find();

        const student = allStudents.find((it) => data.studentId === it._id)
            .map((it) => Student.toDto(it));

        return new AcademicPerformanceDto(
            student,
            data.date,
            data.performance,
        );
    }
}