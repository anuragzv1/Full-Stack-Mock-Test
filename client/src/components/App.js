import React from 'react';
import Navbar from './Navbar';
import MainContent from './MainContent';
import MainContent2 from './MainContent2';
import InterviewList from './InterviewList';
import Jobs from './Jobs'
import '../assets/css/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      students: [],
      interviews: [],
      page: 1
    }
  }

  //this function is used to change the state of the interview
  changeIntState = async (student_id, interview_id, oldstate, newstate) => {
    console.log(oldstate + " " + newstate);
    let changeState =await fetch('/interviews/changestate', {
      method: 'post',
      body: JSON.stringify({
        student_id,
        interview_id,
        oldstate,
        newstate
      }),
      headers: {
        'content-type': 'application/json'
      }
    });

    let changeStateResult = await changeState.json();
    if(changeStateResult.message=='success'){
      this.notify('success','state change '+oldstate+'->'+newstate);
      this.getInterviews();
    }
    else{
      this.notify('error','State change failed');
    }
   

  }

  //this function creates Interview
  createInterview = async (company, date) => {
    if (company === "" || date === "") {
      this.notify('error', 'Date or Company name empty');
      return;
    }
    let tryCreateInterview = await fetch('/interviews/create', {
      method: 'post',
      body: JSON.stringify({
        company,
        date
      }),
      headers: {
        'content-type': 'application/json'
      }
    });

    let createdInterview = await tryCreateInterview.json();
    console.log(createdInterview.interview);
    if (createdInterview.message == 'success') {
      this.notify('success', 'New ' + company + ' Interview created!');
      this.getInterviews();
    }
    else {
      this.notify('error', 'Interview creation failed');
    }

  }

  //this function gets all the interviews
  getInterviews = async () => {
    let tryGetInterviews = await fetch('/interviews/getlist', {
      method: 'post',
    })

    let interviews = await tryGetInterviews.json();
    console.log(interviews);
    if (interviews.message == 'success') {
      this.setState({
        interviews: interviews.interviews
      });
    }

  }
  //this function sets the page
  setpage = (page) => {
    this.setState({
      page
    })
  }

  //function to create notification
  notify = (type, message) => {
    switch (type) {
      case 'error': {
        toast.error(message);
        break;
      }
      case 'success': {
        toast.success(message);
        break;
      }
      case 'warn': {
        toast.warn(message);
        break;
      }
    }
  };

  //loading states on component mounting
  async componentDidMount() {
    const login = await fetch('/isAuthenticated', { method: 'post', withCredentials: true });
    const isLoggedInState = await login.json();
    console.log(isLoggedInState);
    if (isLoggedInState) {
      this.getInterviews();
      this.getStudents();
      this.setState({
        isLoggedIn: isLoggedInState,
      })
    }
  }

  //function to login the user
  login = async (username, password) => {
    const trylogin = await fetch('/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'content-type': 'application/json'
      }
    })

    if (trylogin.status === 401) {
      this.notify('error', 'Invalid username password!');
    }
    else {
      const loginjson = await trylogin.json();
      console.log(loginjson);
      if (loginjson.isLoggedIn == true) {
        this.notify('success', 'Welcome back :)');
        this.setState({
          isLoggedIn: true
        })
      }
    }
  }

  //this fucntion sends ajax call to register a new User
  register = async (username, password, repeatpassword) => {
    console.log(username, password, repeatpassword);
    if (password !== repeatpassword) {
      this.notify('warn', 'Passwords do not match');
    }
    else {
      const tryregister = await fetch('/register', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'content-type': 'application/json'
        }
      })

      const tryregisterjson = await tryregister.json();
      if (tryregisterjson.message === "success") {
        this.notify('success', 'New registration successfull :)');
      }
      else if (tryregisterjson.message === "error") {
        this.notify('error', 'New registration failed :/');
      }
      else if (tryregisterjson.message == "username already occupied") {
        this.notify('warn', 'Username already taken :/');
      }
    }
  }

  //this function send logout request
  logout = () => {
    const tryLogout = fetch('/logout', {
      method: 'post'
    });
    this.notify('success', 'Goodbye :)');
    this.setState({
      isLoggedIn: false
    })
  }

  //this function adds a student to database
  addstudent = async (name, batch, dsascore, wdscore, rescore, college, placed) => {
    let newStudent = await fetch('/students/add', {
      method: 'post',
      body: JSON.stringify({
        name,
        batch,
        courseScores: {
          DSA: dsascore,
          WD: wdscore,
          RE: rescore
        },
        college,
        placed
      }),
      headers: {
        'content-type': 'application/json'
      }
    });

    console.log(newStudent);
    newStudent = await newStudent.json();
    if (newStudent.message == "success") {
      this.notify('success', 'New student added');
      this.getStudents();
    }
    else {
      this.notify('error', 'Adding student failed');
    }
  }

  //this function get the students
  async getStudents() {
    const trystudents = await fetch('/students/list', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
    let students = await trystudents.json();
    students = JSON.parse(students);
    console.log(typeof (students));
    this.setState({ loading: false, students })
  }

//rendering the app
  render() {
    return (
      <div className="App">
        <ToastContainer position="bottom-left" />
        <Navbar setpage={this.setpage} logout={this.logout} isLoggedIn={this.state.isLoggedIn} />
        <div className="condition-div">
          {(this.state.isLoggedIn && this.state.page == 1) && <MainContent2 students={this.state.students} addstudent={this.addstudent} notify={this.notify} />}
          {(this.state.isLoggedIn && this.state.page == 2) && <InterviewList notify={this.notify} changeIntState={this.changeIntState}  students={this.state.students} interviews={this.state.interviews} createInterview={this.createInterview} />}
          {(this.state.isLoggedIn && this.state.page == 3) && <Jobs notify={this.notify} changeIntState={this.changeIntState} />}
          {this.state.isLoggedIn === false && <MainContent notify={this.notify} login={this.login} register={this.register} />}
        </div>
      </div>
    );
  }
}

export default App;
