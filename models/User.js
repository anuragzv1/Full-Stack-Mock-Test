const mongoose = require('mongoose');

//this is the user model
const UserModel = mongoose.Schema({
    name:String,
    username:String,
    password:String,
});

const User = mongoose.model('User',UserModel);
module.exports = User;