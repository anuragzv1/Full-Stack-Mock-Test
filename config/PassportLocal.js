const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField:'username'
},
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { 
                if(err)console.log(err);
                return done(err); 
            }
            if (!user) { 
                console.log('User not found!');
                return done(null, false); 
            }
            if (user.password!=password) { 
                console.log('Passwords do not match');
                return done(null, false); 
            }
            console.log('User authenticated');
            return done(null, user);
        });
    }
));


passport.serializeUser(function (user, done) { //In serialize user you decide what to store in the session. Here I'm storing the user id only.
    done(null, user.id);
});

passport.deserializeUser(function (id, done) { //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
    User.findById(id, function (err, user) {
        if(err)return done(err);
        return done(err, user);
    });
});


module.exports = passport;