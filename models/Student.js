const mongoose = require('mongoose');

//defining the Student model
const StudentSchema = new mongoose.Schema({
    name: String,
    batch: String,
    courseScores: {
        DSA: { type: Number }, //data structures
        WD: { type: Number },  //Web Development
        RE: { type: Number }   //React course
    },
    college: String,
    placed: Boolean,
})

//telling mongoose it is a model
var Student = mongoose.model('Student', StudentSchema);

//exporting Student model
module.exports = Student;
