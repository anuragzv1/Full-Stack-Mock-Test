import React from 'react';


import '../assets/css/Navbar.css'

//this is the navbar component , shows hides various pages accn to user logged in or not
class Navbar extends React.Component {
    render() {
        const {setpage, isLoggedIn, logout } = this.props;
        return (
            <div className="navbar">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                    iNterbase &nbsp;
                <img style={{ width: 50, height: 50 }} src="https://image.flaticon.com/icons/svg/2906/2906274.svg" />
                </div>
                <div className="pages">
                    {isLoggedIn && <div onClick={()=>{setpage(1)}}  className="students-page-btn nav-item" >STUDENTS</div>}
                    {isLoggedIn && <div onClick={()=>{setpage(2)}} className="inter-page-btn nav-item">INTERVIEWS</div>}
                    {isLoggedIn && <div onClick={()=>{setpage(3)}} className="jobs-page-btn nav-item">JOBS</div>}
                </div>
                {isLoggedIn && <div className="logout-btn"><button onClick={() => logout()}>Logout</button></div>}
            </div>
        )
    }
}

export default Navbar;