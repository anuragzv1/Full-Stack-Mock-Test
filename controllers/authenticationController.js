const passport = require('passport');
const User = require('../models/User');


//this function checks the authentication
module.exports.authChecker = function (req, res) {
    if (req.isAuthenticated()) {
        console.log('User authenticated');
        return res.send(true);
    }
    else {
        console.log('User not Authenticated');
        return res.send(false);
    }
}

//this fucntion logs in the user
module.exports.login = function (req, res) {
    return res.send(JSON.stringify({ isLoggedIn: true }));
}

//this function register a new user in the database
module.exports.register = async function (req, res) {
    console.log(req.body);

    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.json({ "message": "username already occupied" });
        }
        else if (!user) {
            const newUser = User.create(req.body);
            if (newUser) {
                return res.json({ "message": "success" });
            }
            else return res.json({ "message": "error" });
        }
    }
    catch (error) {
        return res.json({ "message": "error" });
    }

}

//this fucntion logs the user out
module.exports.logout = function (req, res) {
    req.logout();
    return res.status(200);
}