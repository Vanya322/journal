module.exports = class StudentDto {
    constructor(
        id,
        name,
        birthday,
        studentTicket,
        academicBook,
    ) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.studentTicket = studentTicket;
        this.academicBook = academicBook;
    }

    static toDto(data) {
        return new StudentDto(
            data._id,
            data.name,
            data.birthday,
            data.studentTicket,
            data.academicBook,
        );
    }
}