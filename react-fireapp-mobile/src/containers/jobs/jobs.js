import React, { Component } from 'react';
import JobsTable from "../../components/jobs/jobsTable";
import {loadJobs} from "../../utils/jobsService";



class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: []
    }
  }

  componentDidMount() {
    loadJobs()
      .then(jobs => this.setState({jobs: jobs}))
  }

  render() {
    return (
      <div className="App">

        <JobsTable jobs={this.state.jobs}/>
      </div>
    );
  }
}

export default Jobs;
