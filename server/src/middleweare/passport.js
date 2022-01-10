const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const UserDB = require('../db-models/User');

const keys = require('../config/keys');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt,
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (payload, done)=> {

            try {
                const user = await UserDB.findById(payload.userId)

                if(user) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            }
            catch (e) {
                console.log(e);
            }

        })
    )
}