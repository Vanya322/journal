export class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static toDto(data) {
        return new Student(data._id, data.name);
    }
}