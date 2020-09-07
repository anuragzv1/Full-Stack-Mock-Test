const { Parser } = require('json2csv');
const Interview = require('../models/Interview');


//this module parses the JSON data and sends the created csv 
module.exports.download = async function (req, res) {
    let interview = await Interview.find({}).populate('failed').populate('passed').populate('notattempted').populate('onhold');
    let finalJson = [];
    for (let i = 0; i < interview.length; i++) {
        let interviewCompany = interview[i];
        for (let j = 0; j < interviewCompany.passed.length; j++) {
            let Interview_Name = interviewCompany.company;
            let passedStudent = interviewCompany.passed[j];
            let Student_id = passedStudent._id;
            let Interview_Date = interviewCompany.date;
            let Student_Name = passedStudent.name;
            let Result = 'passed'
            let Batch = passedStudent.batch;
            let College = passedStudent.college;
            let Placed = passedStudent.placed;
            let dsa_score = passedStudent.courseScores.DSA;
            let react_score = passedStudent.courseScores.RE;
            let web_dev_score = passedStudent.courseScores.WD;
            finalJson.push({ Student_Name, Batch, College, Placed, Interview_Name, Student_id, Interview_Date, Result, dsa_score, react_score, web_dev_score });
        }
        for (let j = 0; j < interviewCompany.failed.length; j++) {
            let Interview_Name = interviewCompany.company;
            let passedStudent = interviewCompany.failed[j];
            let Student_id = passedStudent._id;
            let Interview_Date = interviewCompany.date;
            let Student_Name = passedStudent.name;
            let Result = 'failed'
            let Batch = passedStudent.batch;
            let College = passedStudent.college;
            let Placed = passedStudent.placed;
            let dsa_score = passedStudent.courseScores.DSA;
            let react_score = passedStudent.courseScores.RE;
            let web_dev_score = passedStudent.courseScores.WD;
            finalJson.push({ Student_Name, Batch, College, Placed, Interview_Name, Student_id, Interview_Date, Result, dsa_score, react_score, web_dev_score });
        }

        for (let j = 0; j < interviewCompany.notattempted.length; j++) {
            let Interview_Name = interviewCompany.company;
            let passedStudent = interviewCompany.notattempted[j];
            let Student_id = passedStudent._id;
            let Interview_Date = interviewCompany.date;
            let Student_Name = passedStudent.name;
            let Result = 'Not attempted'
            let Batch = passedStudent.batch;
            let College = passedStudent.college;
            let Placed = passedStudent.placed;
            let dsa_score = passedStudent.courseScores.DSA;
            let react_score = passedStudent.courseScores.RE;
            let web_dev_score = passedStudent.courseScores.WD;
            finalJson.push({ Student_Name, Batch, College, Placed, Interview_Name, Student_id, Interview_Date, Result, dsa_score, react_score, web_dev_score });
        }
        for (let j = 0; j < interviewCompany.onhold.length; j++) {
            let Interview_Name = interviewCompany.company;
            let passedStudent = interviewCompany.onhold[j];
            let Student_id = passedStudent._id;
            let Interview_Date = interviewCompany.date;
            let Student_Name = passedStudent.name;
            let Result = 'onhold'
            let Batch = passedStudent.batch;
            let College = passedStudent.college;
            let Placed = passedStudent.placed;
            let dsa_score = passedStudent.courseScores.DSA;
            let react_score = passedStudent.courseScores.RE;
            let web_dev_score = passedStudent.courseScores.WD;
            finalJson.push({ Student_Name, Batch, College, Placed, Interview_Name, Student_id, Interview_Date, Result, dsa_score, react_score, web_dev_score });
        }
    }

    const fields = ['Student_Name', 'Batch', 'College', 'Placed', 'Interview_Name', 'Student_id', 'Interview_Date', 'Result', 'dsa_score', 'react_score', 'web_dev_score'];
    const opts = { fields };

    try {
        const parser = new Parser();
        const csv = parser.parse(finalJson);
        res.setHeader('Content-disposition', 'attachment; filename=data.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
    } catch (err) {
        console.error(err);
    }



}