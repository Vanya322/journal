const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const UserDB = require('../db-models/User');

const createToken = (user, expiresIn, tokenType) => {
    return jwt.sign(
        {
            userId: user._id,
            tokenType,
            email: user.email,
            userType: user.type,
        },
        keys.jwt,
        {
            expiresIn,
        }
    );
}

module.exports.getBearerTokenForActions = (user) => {
    return `Bearer ${createToken(user,  60 * 60, "ACTIONS")}`;
}

module.exports.getBearerTokenForAuthorize = (user) => {
    return `${createToken(user,  60 * 60 * 24 * 30, "AUTHORIZATION")}`;
}

module.exports.parseAuthToken = async (token) => {
    if (!token) return undefined;

    const parsedToken = jwt.decode(token);
    if (parsedToken.tokenType === 'AUTHORIZATION') {
        return UserDB.findById(parsedToken.userId);
    }

    return undefined;
}