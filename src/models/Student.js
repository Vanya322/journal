module.exports = class StudentDto {
    constructor(id, name, birthday) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
    }

    static toDto(data) {
        return new StudentDto(data._id, data.name, data.birthday);
    }
}