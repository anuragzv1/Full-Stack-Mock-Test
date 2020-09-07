import React from 'react';
import JobCard from './JobCard'



//this is the JObs components fetches jobs from API and renders them
class Jobs extends React.Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
            loading:true
        }
    }

    async componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=react'
        )
            .then(data => data.json())
            .then(data => {
                this.setState({
                    jobs: data,
                    loading:false
                })
            });
    }
    render() {
        const { jobs } = this.state;
        return (
            <div style={{display:'flex',height:'120vh',width:'100vw',flexDirection:'column',flexWrap:'wrap'}} className="jobs">
                {this.state.loading && <center><h2>Loading.. Please wait :)</h2></center>}
                {jobs.map((job, id) =>
                    <JobCard job={job} key={id} />
                )}
            </div>
        )
    }

}

export default Jobs;