export class Student {
    constructor(
        id,
        name,
        birthday,
        studentTicket,
        academicBook,
        group,
    ) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.studentTicket = studentTicket;
        this.academicBook = academicBook;
        this.group = group;
    }

    static fromDto(data, group) {
        return new Student(
            data.id,
            data.name,
            data.birthday,
            data.studentTicket,
            data.academicBook,
            group
        );
    }
}

export class StudentDto {
    constructor(
        id,
        name,
        birthday,
        studentTicket,
        academicBook,
        groupId,
    ) {
    this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.studentTicket = studentTicket;
        this.academicBook = academicBook;
        this.groupId = groupId;
    }

    static toDto(data) {
        return new StudentDto(
            data.id,
            data.name,
            data.birthday,
            data.studentTicket,
            data.academicBook,
            data.group.id
        );
    }
}