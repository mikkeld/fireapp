import React, { Component } from 'react';
import JobsTable from "../../components/jobs/jobsTable";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import AppBar from "../../components/appBar";
import Spinner from "../../components/shared/spinner";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      loading: true
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
        jobs: previousJobs,
        loading: false
      });
    })
  }

  render() {
    const activeJobs = this.state.jobs.filter(job => !job.completed);
    return (
      <div>
        <AppBar title={"All active jobs"} />
        {this.state.loading && <Spinner /> }
        <JobsTable jobs={activeJobs}/>
      </div>
    );
  }
}

export default Jobs;
