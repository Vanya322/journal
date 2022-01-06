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

            console.log('payload', payload)

            try {
                const user = await UserDB.findById(payload.userId)
                    .select('email id');

                console.log("PASS", user);
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