import React from 'react';
import '../assets/css/InterviewCard2.css'
class InterviewCard2 extends React.Component {
    constructor() {
        super();
        this.state = {
            passed: [],
            failed: [],
            onhold: [],
            notattemped: []
        }
    }

    //this function assigns a student's interview to a company
    assignInt = async (interview_id, student_id) => {
        const { notify } = this.props;
        for (let i = 0; i < this.state.failed.length; i++) {
            if (this.state.failed[i]._id == student_id) {
                notify('warn', 'Already Assigned');
                return;
            }
        }
        for (let i = 0; i < this.state.passed.length; i++) {
            if (this.state.passed[i]._id == student_id) {
                notify('warn', 'Already Assigned');
                return;
            }
        }
        for (let i = 0; i < this.state.onhold.length; i++) {
            if (this.state.onhold[i]._id == student_id) {
                notify('warn', 'Already Assigned');
                return;
            }
        }
        for (let i = 0; i < this.state.notattemped.length; i++) {
            if (this.state.notattemped[i]._id == student_id) {
                notify('warn', 'Already Assigned');
                return;
            }
        }

        const { interview } = this.props;
        console.log('Assinging' + interview_id + 'to' + student_id);
        let assignInterview = await fetch('/interviews/addstudent', {
            method: 'post',
            body: JSON.stringify({
                interview_id,
                student_id
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        this.getStudentsInAcompany(interview.company)

    }

    //this function gest students assigned a particular company
    getStudentsInAcompany = async (company) => {
        let getStudents = await fetch('/company/students', {
            method: 'post',
            body: JSON.stringify({
                company
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        let res = await getStudents.json();
        let notattemped = [];
        let failed = [];
        let passed = [];
        let onhold = [];

        for (let i = 0; i < res.data.length; i++) {
            const cur = res.data[i];
            for (let j = 0; j < cur.notattempted.length; j++) {
                notattemped.push(cur.notattempted[j]);
            }
            for (let j = 0; j < cur.passed.length; j++) {
                passed.push(cur.passed[j]);
            }
            for (let j = 0; j < cur.failed.length; j++) {
                failed.push(cur.failed[j]);
            }
            for (let j = 0; j < cur.onhold.length; j++) {
                onhold.push(cur.onhold[j]);
            }
        }
        this.setState({
            notattemped,
            failed,
            passed,
            onhold
        }, () => {
            console.log('Sate updated', this.state);
        })
    }

    //setting states on component mount
    async componentDidMount() {
        const { interview } = this.props;
        this.getStudentsInAcompany(interview.company);
    }

    handleStatusChange = async (student_id, interview_id, oldstate) => {
        const { interview } = this.props;
        const { changeIntState } = this.props;
        let e = document.getElementById("select-" + oldstate + "-" + interview_id + student_id);
        var newState = e.options[e.selectedIndex].value;
        await changeIntState(student_id, interview_id, oldstate, newState);
        this.getStudentsInAcompany(interview.company);
    }

    //this fucntion shows the student lists
    showStudentList = (id) => {
        document.getElementById("std-list-assign-" + id).style.display = "flex";
    }

    //this function hides the student divs
    hideInterviewDivs = (id) => {
        document.getElementById('std-list-assign-' + id).style.display = "none";
        document.getElementById('stud-list-' + id).style.display = "none";


    }

    //rendering the app
    render() {
        const { assignInt, interview, students } = this.props;
        return (
            <div className="interview-card2" onClick={() => document.getElementById("stud-list-" + interview._id).style.display = "block"}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <div className="inter-company ic-2">
                        <span className="smallText">
                            Company
                    </span><br></br>
                        <span className="boldText">
                            {interview.company}
                        </span>
                    </div>
                    <div className='inter-placed ic-2'>
                        <span className="smallText">
                            Placed/total
                    </span><br></br>
                        <span className="boldText">
                            {this.state.passed && this.state.passed.length + "/" + (this.state.failed.length + this.state.passed.length + this.state.onhold.length + this.state.notattemped.length)}
                        </span>
                    </div>
                    <div className="inter-date ic-2">
                        <span className="smallText">
                            Date
                    </span><br></br>
                        <span className="">
                            <b>{interview.date}</b>
                        </span>
                    </div>
                </div>

                <div className="student-list-interview" id={"stud-list-" + interview._id}>
                    <img id="form-close-btn" onClick={() => this.hideInterviewDivs(interview._id)} src="https://image.flaticon.com/icons/svg/753/753345.svg"></img>&nbsp;
                    <center> Students assigned to {interview.company} :</center>
                    <div className="students-already-assigned">
                        <table >
                            <tbody>
                                {this.state.failed && this.state.failed.map((student, id) => <tr key={id}><td>{student.name}</td><td>{student.college}</td><td>{student.batch}</td><td>
                                    <select id={"select-failed-" + interview._id + student._id} onChange={() => this.handleStatusChange(student._id, interview._id, 'failed')}>
                                        <option value='passed'>PASSED</option>
                                        <option value='failed' selected >FAILED</option>
                                        <option value='not_attempted' >NOT_ATTEMPTED</option>
                                        <option value='onhold'>ONHOLD</option>
                                    </select>
                                </td></tr>)}
                                {this.state.notattemped && this.state.notattemped.map((student, id) => <tr key={id}><td>{student.name}</td><td>{student.college}</td><td>{student.batch}</td><td>
                                    <select id={"select-not_attempted-" + interview._id + student._id} onChange={() => this.handleStatusChange(student._id, interview._id, 'not_attempted')}>
                                        <option value='passed'>PASSED</option>
                                        <option value='failed'>FAILED</option>
                                        <option value='not_attempted' selected>NOT_ATTEMPTED</option>
                                        <option value='onhold'>ONHOLD</option>
                                    </select></td></tr>)}
                                {this.state.onhold && this.state.onhold.map((student, id) => <tr key={id}><td>{student.name}</td><td>{student.college}</td><td>{student.batch}</td><td>
                                    <select id={"select-onhold-" + interview._id + student._id} onChange={() => this.handleStatusChange(student._id, interview._id, 'onhold')}>
                                        <option value='passed'>PASSED</option>
                                        <option value='failed'>FAILED</option>
                                        <option value='not_attempted'>NOT_ATTEMPTED</option>
                                        <option value='onhold' selected>ONHOLD</option>
                                    </select></td></tr>)}
                                {this.state.passed && this.state.passed.map((student, id) => <tr key={id}><td>{student.name}</td><td>{student.college}</td><td>{student.batch}</td><td>
                                    <select id={"select-passed-" + interview._id + student._id} onChange={() => this.handleStatusChange(student._id, interview._id, 'passed')}>
                                        <option value='passed' selected>PASSED</option>
                                        <option value='failed'>FAILED</option>
                                        <option value='not_attempted'>NOT_ATTEMPTED</option>
                                        <option value='onhold'>ONHOLD</option>
                                    </select></td></tr>)}
                            </tbody>
                        </table>
                        <center><button onClick={() => this.showStudentList(interview._id)} className="newAssignBtn" >Assign Students</button></center>

                    </div>
                    <div className="studentListToAssign" id={'std-list-assign-' + interview._id}>
                        <table >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>College</th>
                                    <th>Course</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, id) => <tr key={id}><td>{id + 1}</td><td>{student.name}</td><td>{student.college}</td><td>{student.batch}</td><td><button onClick={() => this.assignInt(interview._id, student._id)} >Assign</button></td></tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default InterviewCard2;