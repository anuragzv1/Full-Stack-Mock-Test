const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session')
const db = require('./config/Mongoose');
var passport = require('passport');
var LocalStrategy = require('./config/PassportLocal');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//using middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'anuragcodes',
  secret: 'interbase-cookie',
  store: new MongoStore({ mongooseConnection: db }),
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/index'));


//starting app at port
app.listen(port, () => console.log(`Listening on port ${port}`));