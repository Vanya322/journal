const groupSubjectsModel = require('../db-models/GroupSubject');
import { GroupSubjectDto } from "./GroupSubject";

export class GroupDto {
    constructor(
        id,
        name,
        groupSubjects,
    ) {
        this.id = id;
        this.name = name;
        this.groupSubjects = groupSubjects;
    }

    static async toDto(data) {
        const allGroupSubjects = await groupSubjectsModel.find();

        const groupSubjects = allGroupSubjects.filter((it) => (
            data.groupSubjects.includes(it._id)
        )).map(async (it) => await GroupSubjectDto.toDto(it));

        return new GroupDto(
            data._id,
            data.name,
            groupSubjects,
        );
    }
}