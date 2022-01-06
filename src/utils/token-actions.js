const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { createToken } = require("./token-actions");

module.exports.createToken = (user, expiresIn, tokenType) => {
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
    return `Bearer ${createToken(user,  60 * 60 * 24 * 30, "AUTHORIZATION")}`;
}