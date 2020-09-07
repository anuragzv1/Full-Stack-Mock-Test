const Interview = require('../models/Interview');

//this fucntion gets students from a particular company
module.exports.studentsByCompany = async function (req, res) {
    try {
        let studentByCompany = await Interview.find({ company: req.body.company }).populate('passed').populate('failed').populate('notattempted').populate('onhold');
        console.log(studentByCompany);
        res.json({
            status: 'success',
            data: studentByCompany
        })
    } catch (error) {
        res.json({
            status: 'error'
        })
    }
}