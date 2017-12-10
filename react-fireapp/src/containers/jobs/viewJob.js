import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import JobAttachmentDialog from "../../components/jobs/jobAttachmentDialog";
import ViewJobDetails from "../../components/jobs/viewJob/viewJobDetails";
import ViewJobActions from "../../components/jobs/viewJob/viewJobActions";
import ViewCompanyDetails from "../../components/jobs/viewJob/viewCompanyDetails";
import ViewClientsDetails from "../../components/jobs/viewJob/viewClientsDetails";
import ViewProductsDetails from "../../components/jobs/viewJob/viewProductsDetails";
import ViewAttachmentDetails from "../../components/jobs/viewJob/viewAttachmentDetails";
import ViewEventLogDetails from "../../components/jobs/viewJob/viewEventLogDetails";
import ViewSummaryDetails from "../../components/jobs/viewJob/viewSummary";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import SimpleSnackbar from "../../components/shared/snackbar";
import {calculateTotalPerProduct} from "../../utils/jobsService";
import BasicDialog from "../../components/shared/dialog";
import ImageGrid from "../../components/shared/imageGrid";
import Spinner from "../../components/shared/spinner";
import PinnedImageDialog from "../../components/jobs/pinnedImageDialog";
import {
  Redirect
} from 'react-router-dom';
import { ViewJobDialogOptions } from "../../utils/jobs/viewJobDialogOptions";

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit*2
  },
  rightElement: {
    float: 'right'
  }
});

const ImageGridDialog = (props) => {
  return (
    <BasicDialog open={!!props.attachment}
                 handleRequestClose={() => props.handleRequestClose(ViewJobDialogOptions.IMAGE_GRID)}
                 fullScreen={props.fullScreen}
                 title={props.title}>
      <ImageGrid attachment={props.attachment}
                 handleDialogShow={(file) => props.handleDialogShow(file, ViewJobDialogOptions.ATTACHMENT)}/>
    </BasicDialog>
  )
};

class ViewJob extends Component {
  constructor() {
    super();

    this.state = {
      currentJob: null,
      entries: [],
      showSnackbar: false,
      snackbarMsg: '',
      dialogs: {
        pinnedImage: null,
        attachment: null,
        imageGrid: null
      },
      loading: true,
      redirect: false
    };

    this.firebase = new FirebaseList('jobs');

    this.handleJobStatusChange = this.handleJobStatusChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.pushLiveToClient = this.pushLiveToClient.bind(this);
    this.handleDialogShow = this.handleDialogShow.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentDidMount() {
    this.firebase.db().ref(`jobs/${this.props.id}`).on('value', (snap) => {
      const job = {
        id: snap.key,
        ...snap.val()
      };
      this.setState({
        currentJob: job,
        loading: false
      })
    });

    const previousEntries = this.state.entries;

    this.firebase.db().ref(`entries/${this.props.id}`).on('child_added', snap => {
      previousEntries.push({
        id: snap.key,
        ...snap.val()
      });

      this.setState({
        entries: previousEntries
      })
    });
  }

  handleRemove() {
    this.firebase.remove(this.props.id)
      .then(() => {
        this.setState({redirect: true})
      })
  };

  pushLiveToClient() {
    const updatedJob = {
      ...this.state.currentJob,
      'lastPushedToClient': Date.now()
    };
    this.firebase.update(this.state.currentJob.id, updatedJob)
      .then(() => this.handleSnackbarShow("Job pushed live to client"))
  }

  handleJobStatusChange() {
    const newState = !this.state.currentJob.completed;
    const updatedJob = {
      ...this.state.currentJob,
      'completed': newState
    };
    this.firebase.update(this.state.currentJob.id, updatedJob)
  }

  handleSnackbarShow = (msg) => {
    this.setState({
      showSnackbar: true,
      snackbarMsg: msg
    });
  };

  handleSnackbarClose= (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ showSnackbar: false });
  };

  handleDialogShow = (item, group) => {
    const updatedDialogState = {
      ...this.state.dialogs,
      [group]: item
    };
    this.setState({ dialogs: updatedDialogState })
  };

  handleDialogClose = group => {
    const updatedDialogState = {
      ...this.state.dialogs,
      [group]: null
    };
    this.setState({ dialogs: updatedDialogState })
  };

  render() {
    const {classes} = this.props;
    let {_, costPerItem} = calculateTotalPerProduct(this.state.entries);
    if (this.state.redirect) {
      return <Redirect to='/jobs' push/>
    } else {
      if (this.state.loading) {
        return <Spinner/>
      } else {
        return (
          <div className={classes.wrapper}>
            {this.state.currentJob &&
            <div>
              <ViewJobActions currentJob={this.state.currentJob}
                              handleJobStatusChange={this.handleJobStatusChange}
                              pushLiveToClient={this.pushLiveToClient}
              />
              <ViewJobDetails currentJob={this.state.currentJob}/>
              <ViewCompanyDetails currentJob={this.state.currentJob}/>
              <ViewClientsDetails currentJob={this.state.currentJob}/>
              <ViewProductsDetails currentJob={this.state.currentJob}/>
              {this.state.currentJob.selectedUploads && this.state.currentJob.selectedUploads.length > 0
                ? <ViewAttachmentDetails currentJob={this.state.currentJob}
                                         handleDialogShow={(file) => this.handleDialogShow(file, ViewJobDialogOptions.ATTACHMENT)}
                  />
                : null}
              <ViewEventLogDetails jobId={this.state.currentJob.jobId}
                                   jobKey={this.state.currentJob.id}
                                   entries={this.state.entries}
                                   handleDialogShow={this.handleDialogShow}/>
              <ViewSummaryDetails stats={costPerItem}/>
              <JobAttachmentDialog attachment={this.state.dialogs[ViewJobDialogOptions.ATTACHMENT]}
                                   handleRequestClose={() => this.handleDialogClose(ViewJobDialogOptions.ATTACHMENT)} />
              <ImageGridDialog attachment={this.state.dialogs[ViewJobDialogOptions.IMAGE_GRID]}
                               handleRequestClose={this.handleDialogClose}
                               handleDialogShow={this.handleDialogShow}
                               title="Pictures for job"
                               fullScreen={false}/>
              <PinnedImageDialog attachment={this.state.dialogs[ViewJobDialogOptions.PINNED_IMAGE]}
                                 handleRequestClose={() => this.handleDialogClose(ViewJobDialogOptions.PINNED_IMAGE)}
                                 otherMarkedEntries={this.state.entries} />
              <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                              handleSnackbarClose={this.handleSnackbarClose}
                              snackbarMsg={this.state.snackbarMsg}/>

            </div>}
          </div>
        );
      }
    }
  }
}

export default withStyles(styles)(ViewJob);

