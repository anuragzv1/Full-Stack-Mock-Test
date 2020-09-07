const express = require('express');
const Router = express.Router();

//student router
Router.post('/list',require('../controllers/StudentController').getstudent);
Router.post('/add',require('../controllers/StudentController').addstudent);

module.exports=Router;