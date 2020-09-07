const express = require('express');
const Router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local');

//router index
Router.post('/isAuthenticated', require('../controllers/authenticationController').authChecker);
Router.post('/login', passport.authenticate('local'), require('../controllers/authenticationController').login);
Router.post('/register', require('../controllers/authenticationController').register);
Router.post('/logout', require('../controllers/authenticationController').logout)
Router.use('/students', require('./students'));
Router.use('/interviews', require('./interview'));
Router.use('/company', require('./company'));
Router.get('/export',require('../controllers/exportController').download)


module.exports = Router;