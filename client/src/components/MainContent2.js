import React from 'react';
import loader from '../assets/images/loading.gif'
import StudentCard from './StudentCard'
import '../assets/css/MainComponent2.css'

//this page shows the students with there scores
class MainContent2 extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            students:[]
        }
    }
    componentDidMount(){
        this.setState({
            loading:false,
        })
    }

    //function shows the student add form
    showForm = () => {
        let info = document.getElementById('noStds');
        if (info != null) {
            info.style.display = "none";
        }
        document.getElementById('new-std-form').style.display = "flex";
    }
    //this fucntion adds a new student to the DB
    addstudentnative = async () => {
        const { addstudent } = this.props;
        let name = document.getElementById('studentName').value;
        let batch = document.getElementById('studentBatch').value;
        let dsascore = document.getElementById('dsascore').value;
        let wdscore = document.getElementById('wdscore').value;
        let rescore = document.getElementById('rescore').value;
        let college = document.getElementById('studentCollege').value;
        let e = document.getElementById("studentPlaced");
        let placed = e.options[e.selectedIndex].value;
        await addstudent(name, batch, dsascore, wdscore, rescore, college, placed);
    }
    render() {
        const { loading } = this.state;
        const {students }=this.props;
        return (
            <div className="register" style={{ color: 'black' }}>

                {loading ? <img style={styles.loader} src={loader} /> : ""}
                {(!loading && students.length == 0) && <span id="noStds" style={styles.noStudent}>No Students for now , Add one!</span>}
                <div className="add-student-btn">
                    <button style={styles.addbtn} onClick={() => this.showForm()}>Add Student</button>
                </div>

                <div className="new-std-form" id="new-std-form" style={styles.form}>
                    <span id="closeform" onClick={() => { document.getElementById('new-std-form').style.display = "none" }}><img style={styles.closeimg} src="https://image.flaticon.com/icons/svg/753/753345.svg"></img></span>
                    <input type="text" placeholder="Name" name="studentName" id="studentName"></input>
                    <input type="text" placeholder="Batch" name="studentBatch" id="studentBatch"></input>
                    <input type="number" placeholder="DSA Score" defaultValue='0' name="dsascore" id="dsascore"></input>
                    <input type="number" placeholder="WD Score" defaultValue='0' name="wdscore" id="wdscore"></input>
                    <input type="number" placeholder="React Score" defaultValue='0' name="rescore" id="rescore"></input>
                    <input type="text" placeholder="College" name="studentCollege" id="studentCollege"></input>
                    <select id="studentPlaced">
                        <option value="true" defaultValue>Placed</option>
                        <option value="false">Not Placed</option>
                    </select>
                    <button onClick={() => this.addstudentnative()}>ADD</button>
                </div>
                {(!loading && students.length != 0) && students.map((student, id) => { return <StudentCard student={student} key={id} id={id} />})}
            </div>
        )
    }
}

//styles of various components
const styles = {
    loader: {
        position: 'relative',
        top: 250
    },
    noStudent: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 150
    },
    addbtn: {
        width: 150,
        height: 60,
        borderRadius: 7,
        outline: 0,
        cursor: 'pointer'
    },
    form: {
        display: 'none',
        backgroundColor: 'whitesmoke',
        padding: 25
    },
    closeimg: {
        width: 15,
        height: 15,
        position: 'relative',
        paddingRight: 10,
        paddingTop: 4,
        cursor: 'pointer'
    }
}
export default MainContent2;