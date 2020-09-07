const Interview = require('../models/Interview');
const Student = require('../models/Student');


//this function adds interviews
module.exports.createinterview = async (req, res) => {
    console.log(req.body);
    try {
        let newInterview = await Interview.create(req.body);
        if (newInterview) {
            return res.json({
                message: 'success',
                interview: newInterview
            })
        }
        else return res.json({
            message: 'error'
        })
    } catch (error) {
        return res.json({
            message: 'error',
        })
    }
}

//this function gets the list of  interviews
module.exports.getlist = async (req, res) => {
    try {
        let list = await Interview.find({}).populate('passed').populate('failed').populate('notattempted').populate('onhold');
        if (list) {
            return res.json({
                message: 'success',
                interviews: list
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    } catch (error) {
        return res.json({
            message: 'error'
        })
    }
}

//this function assigns a student to an interview
module.exports.addstdent = async function (req, res) {
    console.log(req.body);
    try {
        const interview = await Interview.findById(req.body.interview_id);
        interview.notattempted.push(req.body.student_id);
        interview.save();
        return res.json({
            message: 'success'
        })
    } catch (error) {
        return res.json({
            message: 'error'
        })
    }
}

//this function changes state of a student in interview
module.exports.changestate = async function (req, res) {
    console.log(req.body);
    let oldstate = req.body.oldstate;
    let newstate = req.body.newstate
    try {
        let interview = await Interview.findOne({ _id: req.body.interview_id });
        switch (oldstate) {
            case 'failed': {
                let indexOfEle = interview.failed.indexOf(req.body.student_id);
                interview.failed.splice(indexOfEle, 1);
                if (newstate == 'passed') {
                    interview.passed.push(req.body.student_id);
                    interview.save()
                }
                else if (newstate == 'not_attempted') {
                    interview.notattempted.push(req.body.student_id);
                    interview.save()

                }
                else if (newstate == 'onhold') {
                    interview.onhold.push(req.body.student_id);
                    interview.save()

                }
                return res.json({
                    message: 'success'
                })
                break;
            }

            case 'passed':
                {
                    let indexOfEle = interview.passed.indexOf(req.body.student_id);
                    interview.passed.splice(indexOfEle, 1);
                    if (newstate == 'failed') {
                        interview.failed.push(req.body.student_id);
                        interview.save()

                    }
                    else if (newstate == 'not_attempted') {
                        interview.notattempted.push(req.body.student_id);
                        interview.save()

                    }
                    else if (newstate == 'onhold') {
                        interview.onhold.push(req.body.student_id);
                        interview.save();
                    }
                    return res.json({
                        message: 'success'
                    })
                    break;
                }
            case 'onhold': {
                let indexOfEle = interview.onhold.indexOf(req.body.student_id);
                interview.onhold.splice(indexOfEle, 1);
                if (newstate == 'failed') {
                    interview.failed.push(req.body.student_id);
                    interview.save()
                }
                else if (newstate == 'not_attempted') {
                    interview.notattempted.push(req.body.student_id);
                    interview.save()

                }
                else if (newstate == 'passed') {
                    interview.passed.push(req.body.student_id);
                    interview.save();
                }
                return res.json({
                    message: 'success'
                })
                break;
            }
            case 'not_attempted': {
                let indexOfEle = interview.notattempted.indexOf(req.body.student_id);
                console.log(indexOfEle);
                interview.notattempted.splice(indexOfEle, 1);
                if (newstate == 'failed') {
                    interview.failed.push(req.body.student_id);
                    interview.save()

                }
                else if (newstate == 'passed') {
                    console.log('new state is passed');
                    interview.passed.push(req.body.student_id);
                    interview.save()

                }
                else if (newstate == 'onhold') {
                    interview.onhold.push(req.body.student_id);
                    interview.save()

                }
                return res.json({
                    message: 'success'
                })
                break;
            }
            default:
                break;
        }
    } catch (error) {
        return res.json({
            message: 'error'
        });
    }

}