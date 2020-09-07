
//this file contains the configuration of mongoose
const mongoose = require('mongoose');

//connecting with mongo db atlas
 mongoose.connect('mongodb+srv://shyam0:shyam0password@shyam0.rqosd.mongodb.net/Shyam0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
//checking for errors
db.on('error', console.error.bind(console, 'connection error:'));

//logging that the db is successfully connected
db.once('open', function() {
  console.log('Connected to Db!');
});

//exporting the db
module.exports = db;


