module.exports = class StudentDto {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static toDto(data) {
        return new StudentDto(data._id, data.name);
    }
}