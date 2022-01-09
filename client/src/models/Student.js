export class Student {
    constructor(id, name, birthday) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
    }

    static fromDto(data) {
        return new Student(data.id, data.name, data.birthday);
    }
}