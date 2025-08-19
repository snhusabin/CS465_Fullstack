const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(
    new localStrategy({
            usernameField: 'email'
        },
        async(username, password, done) => {
            const q = await User.findOne({ email: username }).exec();
            if (!q) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!q.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, q);
        })
);