import React from 'react';
import '../assets/css/InterviewList.css';
import InterviewCard2 from './InterviewCard2';

//this component renderst the interviews list
class InterviewList extends React.Component {

    //show the interview create list
    showInterviewCreateDiv = () => {
        document.getElementsByClassName('interview-add-form')[0].style.display = "flex";
    }

    //hide the interview create list
    hideInterviewCreateDiv = () => {
        document.getElementsByClassName('interview-add-form')[0].style.display = "none";
    }
    
    //rendering the interviews
    render() {
        const {notify, changeIntState, students, interviews, createInterview } = this.props;
        return (
            <div className="interview-list">
                <div className="create-interview-btn">
                    <button onClick={() => this.showInterviewCreateDiv()} style={{ marginBottom: 20, width: 150, height: 60, outline: 0 }}>Create Interview</button>
                    <button onClick={()=>{
                        window.open('http://localhost:5000/export');
                    }}  style={{marginBottom: 20, width: 150, height: 60, outline: 0}}>DOWNLOAD CSV</button>
                </div>

                <div className="interview-add-form">
                    <img id="form-close-btn" onClick={() => this.hideInterviewCreateDiv()} src="https://image.flaticon.com/icons/svg/753/753345.svg"></img>&nbsp;
                    <input type="text" placeholder="Company name" id="companyName"></input>
                    <input type="date" id="companyDate"></input>
                    <button id="inter-form-btn" onClick={() => createInterview(
                        document.getElementById('companyName').value,
                        document.getElementById('companyDate').value
                    )}>ADD</button>
                </div>

                {interviews.length == 0 && <h2>We do not have any interviews yet , add one :)</h2>}
                {interviews.length != 0 && interviews.map((interview, id) => <InterviewCard2 notify={notify} changeIntState={changeIntState} students={students} key={id} interview={interview} />)}
            </div>
        )
    }
}

export default InterviewList;