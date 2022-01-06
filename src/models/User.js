module.exports = class UserDto {
    constructor(id, name, email, type) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type;
    }

    static toDto(data) {
        return new UserDto(data._id, data.name, data.email, data.type);
    }
}