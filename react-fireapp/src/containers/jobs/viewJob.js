import React, { Component } from 'react';
import {loadJobFromId, updateJob} from "../../utils/jobsService";
import {updatedUsers} from "../../utils/utils";
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import {ViewJobAttachment} from "../../components/jobs/viewJobAttachment";
import ViewJobDetails from "../../components/jobs/viewJob/viewJobDetails";
import ViewCompanyDetails from "../../components/jobs/viewJob/viewCompanyDetails";
import ViewClientsDetails from "../../components/jobs/viewJob/viewClientsDetails";
import ViewProductsDetails from "../../components/jobs/viewJob/viewProductsDetails";
import ViewAttachmentDetails from "../../components/jobs/viewJob/viewAttachmentDetails";
import ViewEventLogDetails from "../../components/jobs/viewJob/viewEventLogDetails";
import ViewSummaryDetails from "../../components/jobs/viewJob/viewSummary";

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit*2
  },
  rightElement: {
    float: 'right'
  }
});

class ViewJob extends Component {
  constructor() {
    super();

    this.state = {
      currentJob: null,
      promiseResolved: false,
      attachmentDialogOpen: false,
      openAttachment: null,
    };

    this.handleJobStatusChange = this.handleJobStatusChange.bind(this)
  }


  componentDidMount() {
    loadJobFromId(this.props.id)
      .then(job => this.setState({currentJob: job}))
  }

  handleRemove() {
    console.log("should remove job")
  }

  handleAttachmentDialogClose =() => {
    this.setState({attachmentDialogOpen: false})
  };

  handleClickOpen = (file) => {
    this.setState({
      attachmentDialogOpen: true,
      openAttachment: file
    });
  };

  handleJobStatusChange() {
    const newState = !this.state.currentJob.completed;
    const updatedJob = {
      ...this.state.currentJob,
      'completed': newState
    };
    updateJob(updatedJob);
    this.setState({
      currentJob: updatedJob
    });
  }

  render() {
    const { classes } = this.props;
    let confirmDelete = () => {
      const r = window.confirm("Confirm deletion of job");
      return r === true;
    };
    return (
      <div className={styles.wrapper}>
        {this.state.currentJob &&
          <div>
            <div className={classes.wrapper}>
              <Button raised color="primary" >push live to client</Button>
              <Button onClick={() => { if(confirmDelete()) {this.state.handleRemove()}}}>⚠️ Delete</Button>
              <FormControlLabel
                className={classes.rightElement}
                control={
                  <Switch
                    checked={this.state.currentJob.completed}
                    onChange={this.handleJobStatusChange}
                  />
                }
                label="Completed"
              />
            </div>
            <ViewJobDetails currentJob={this.state.currentJob}/>
            <ViewCompanyDetails currentJob={this.state.currentJob}/>
            <ViewClientsDetails currentJob={this.state.currentJob}/>
            <ViewProductsDetails currentJob={this.state.currentJob}/>
            {this.state.currentJob.selectedUploads.length > 0
              ? <ViewAttachmentDetails currentJob={this.state.currentJob} handleClickOpen={this.handleClickOpen}/>
              : null}
            <ViewEventLogDetails currentJob={this.state.currentJob}/>
            <ViewSummaryDetails currentJob={this.state.currentJob}/>

            <ViewJobAttachment open={this.state.attachmentDialogOpen}
                               handleRequestClose={this.handleAttachmentDialogClose}
                               attachment={this.state.openAttachment}
            />

        </div>}

      </div>
    );
  }
}

export default withStyles(styles)(ViewJob);

