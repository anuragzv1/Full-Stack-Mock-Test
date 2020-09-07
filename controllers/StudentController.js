
const Student = require('../models/Student');


//this function gets the list of the student
module.exports.getstudent = async function (req, res) {
    console.log(req.user);
    console.log('List Called');
    try {
        let students = await Student.find({}).populate('interviews');
        return res.json(JSON.stringify(students));
    } catch (error) {
        return res.status(500);
    }
}

//this function adds a new student
module.exports.addstudent = async function (req, res) {
    console.log('Add Called');
    const { name, batch, courseScores, college, placed } = req.body;
    console.log(req.body);
    try {
        let newStudent = await Student.create({
            name: name,
            batch: batch,
            courseScores,
            college: college,
            placed: placed
        });

        if (newStudent) {
            return res.json({
                message: "success",
                data: newStudent
            });
        }
        else return res.json({
            message: "error"
        });
    } catch (error) {
        return res.json({
            message: "error"
        });
    }
}