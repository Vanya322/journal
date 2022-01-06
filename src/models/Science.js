module.exports = class ScienceDto {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static toDto(data) {
        return new ScienceDto(data._id, data.name);
    }
}