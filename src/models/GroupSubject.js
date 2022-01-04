import { AcademicPerformanceDto } from "./AcademicPerformance";
import { SubjectDto } from "./Subject";

const subjectsModel = require('../db-models/Subject');

export class GroupSubjectDto {
    constructor(
        id,
        subject,
        academicPerformances,
    ) {
        this.id = id;
        this.subject = subject;
        this.academicPerformances = academicPerformances;
    }

    static async toDto(data) {
        const allSubjects = await subjectsModel.find();

        const subject = allSubjects.find((it) => it._id === data.subjectId);

        return new GroupSubjectDto(
            data._id,
            SubjectDto.toDto(subject),
            data.academicPerformances.map(async (it) => await AcademicPerformanceDto.toDto(it)),
        );
    }
}