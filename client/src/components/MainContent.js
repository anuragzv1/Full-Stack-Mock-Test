import React from 'react';

import '../assets/css/MainComponent.css'

//this the the main register/login components

class MainContent extends React.Component {
    componentDidMount() {
        console.log('MainContent mounted');
    }
    render() {
        const { login, register } = this.props;
        return (
            <div className="main-div">
                <div className="left-login">
                    <center><h2>Sign in</h2></center>
                    <input id="loginName" type="email" name="loginName" placeholder="Username/email"></input>
                    <img id="user-img" src="https://image.flaticon.com/icons/svg/1077/1077114.svg" />
                    <img id="lock-img" src="https://image.flaticon.com/icons/svg/526/526812.svg" />
                    <input id="loginPassword" type="password" name="loginPassword" placeholder="Password" />
                    <button id="loginBtn" onClick={() => login(document.getElementById('loginName').value,
                        document.getElementById('loginPassword').value
                    )}> <img id="arrow-img" src="https://image.flaticon.com/icons/svg/271/271226.svg" /></button>
                </div>
                <div className="right-register">
                    <center><h2>Register</h2></center>
                    <input id="registerName" type="email" name="registerName" placeholder="Username/email" />
                    <img id="user-img-register" src="https://image.flaticon.com/icons/svg/1077/1077114.svg" />
                    <img id="lock-img-register" src="https://image.flaticon.com/icons/svg/526/526812.svg" />
                    <input id="registerPassword" type="password" name="registerPassword" placeholder="Password" />
                    <img id="lock-img-register2" src="https://image.flaticon.com/icons/svg/526/526812.svg" />
                    <input id="registerPassword2" type="password" name="registerPassword2" placeholder="Password" />
                    <button id="registerBtn" onClick={() => register(
                        document.getElementById('registerName').value,
                        document.getElementById('registerPassword').value,
                        document.getElementById('registerPassword2').value
                    )} > <img id="arrow-img" src="https://image.flaticon.com/icons/svg/271/271226.svg" /></button>
                </div>
            </div>
        )
    }
}

export default MainContent;