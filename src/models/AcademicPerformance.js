const StudentDto = require("./Student")
const StudentsDB = require("../db-models/Student")

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
        const student = await StudentsDB.findById(data.studentId);

        return new AcademicPerformanceDto(
            data._id,
            StudentDto.toDto(student),
            data.date,
            data.performance,
        );
    }
}