const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const User = require('../db-models/User');

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
                const user = await User.findById(payload.userId)
                    .select('email id');

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