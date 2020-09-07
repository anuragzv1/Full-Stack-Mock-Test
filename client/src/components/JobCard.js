import React from 'react'
import '../assets/css/JobCard.css'

//this is a particular job component
class JobCard extends React.Component {
    render() {
        const { job } = this.props;
        console.log(job);
        return (
            <div className="job-card">
                <img src={job.company_logo} style={{ width: 60, height: 60 }}></img>
                <div style={{ fontSize: 12 }} >Title : {job.company}</div>
                <div style={{ fontSize: 12 }} >Location : {job.location}</div>
                <div style={{ fontSize: 12 }}> Title : {job.title}</div>
            </div>
        )
    }
}


export default JobCard;