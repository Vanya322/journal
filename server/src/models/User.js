const {USER_TYPE_ADMIN, USER_TYPE_MEMBER} = require("../utils/utils");

module.exports = class User {
    constructor(id, name, email, type) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type;
    }

    get isAdmin() {
        return this.type === USER_TYPE_ADMIN;
    }

    get isMember() {
        return this.type === USER_TYPE_MEMBER;
    }

    static toModel(data) {
        return new User(data._id, data.name, data.email, data.type);
    }
}