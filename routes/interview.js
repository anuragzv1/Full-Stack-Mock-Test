const express = require('express');
const Router = express.Router();

//interview routes
Router.use('/create',require('../controllers/InterviewController').createinterview);
Router.use('/getlist', require('../controllers/InterviewController').getlist);
Router.use('/addstudent',require('../controllers/InterviewController').addstdent);
Router.use('/changestate',require('../controllers/InterviewController').changestate);

module.exports = Router;