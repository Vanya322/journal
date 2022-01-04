export class SubjectDto {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static toDto(data) {
        return new SubjectDto(data._id, data.name);
    }
}