import React, { Component } from 'react';
import JobsTable from "../../components/jobs/jobsTable";
import {FirebaseList} from "../../utils/firebase/firebaseList";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: []
    };
    this.firebase = new FirebaseList('jobs');
  }

  componentDidMount() {
    const previousJobs = this.state.jobs;

    this.firebase.database.on('child_added', snap => {
      previousJobs.push({
        id: snap.key,
        ...snap.val()
      });
      this.setState({
        jobs: previousJobs
      });
    })
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
