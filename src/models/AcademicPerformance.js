const StudentDto = require("./Student").StudentDto
const studentsModel = require("../db-models/Student")

module.exports = class AcademicPerformanceDto {
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

    static async toDto(data) {
        const allStudents = await studentsModel.find();

        const student = allStudents.find((it) => data.studentId === it._id)
            .map((it) => StudentDto.toDto(it));

        return new AcademicPerformanceDto(
            data._id,
            student,
            data.date,
            data.performance,
        );
    }
}