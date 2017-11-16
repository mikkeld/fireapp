import React, { Component } from 'react';
import {snapshotToArray} from "../../utils/utils";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import SelectJobField from "../../components/reports/selectJobField";
import AvailableReports from "../../components/reports/availableReports";

export class Reports extends Component {
  constructor() {
    super();

    this.state = {
      selectedJob: '',
      availableJobs: [],
      entriesForJob: [],
    };
    this.firebase = new FirebaseList('jobs');
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.firebase.databaseSnapshot('jobs').then((snap) => {
      const jobs = snapshotToArray(snap);
      this.setState({availableJobs: jobs});
    });
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({selectedJob: value});
  };

  render() {
    return (
      <div>
        <SelectJobField handleInputChange={this.handleInputChange}
                        {...this.state} />
        {this.state.selectedJob !== "" && <AvailableReports jobId={this.state.selectedJob}/>}
      </div>
    );
  }
}

