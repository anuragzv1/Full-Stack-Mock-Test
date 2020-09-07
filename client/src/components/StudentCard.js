import React from 'react';
import '../assets/css/StudentCard.css'


//this is the card that shows a particular web page
class StudentCard extends React.Component {
    render() {
        const { student, id, addInterview } = this.props;
        console.log(student);
        return (
            <div className="studentCard">
                <div>
                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                        <div id="studname" >
                            <div style={styles.smallName}>Name</div>
                            <h3 style={{ marginTop: 0 }}>{student.name}</h3>
                        </div>
                        <div id="studbatch">
                            <div style={styles.smallName}>Batch</div>
                            <h3 style={{ marginTop: 0 }}>{student.batch}</h3>
                        </div>
                        <div id="studcollege">
                            <div style={styles.smallName}>College</div>
                            <h3 style={{ marginTop: 0 }}>{student.college}</h3>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%', marginBottom: 10 }}>
                    <div className="score-dsa">
                        <div className="progress-text">
                            &nbsp; DSA {student.courseScores.DSA + '%'}
                        </div>
                        <div className="progress-dsa" style={{ width: student.courseScores.DSA + '%', position: 'relative', top: -15 }}></div>
                    </div>
                    <div className="score-wd">
                        <div className="progress-text">
                            WD {student.courseScores.WD + '%'}
                        </div>
                        <div className="progress-wd" style={{ width: student.courseScores.WD + '%', position: 'relative', top: -15 }}> </div>
                    </div>
                    <div className="score-re">
                        <div className="progress-text">
                            React {student.courseScores.RE + '%'}
                        </div>
                        <div className="progress-re" style={{ width: student.courseScores.RE + '%', position: 'relative', top: -15 }}></div>
                    </div>
                </div>
            </div>
        )
    }
}
const styles = {
    smallName: {
        fontSize: 10,
    }

}
export default StudentCard;