const express = require('express')
const Router = express.Router();

//student routers
Router.post('/students', require('../controllers/companyController').studentsByCompany);


module.exports = Router;