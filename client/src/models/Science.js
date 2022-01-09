export class Science {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromDto(data) {
        return new Science(data.id, data.name);
    }
}