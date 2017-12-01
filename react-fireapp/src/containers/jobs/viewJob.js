import React, { Component } from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import ViewJobAttachment from "../../components/jobs/viewJobAttachment";
import ViewJobDetails from "../../components/jobs/viewJob/viewJobDetails";
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
import ViewPinnedImageDialog from "../../components/jobs/viewEntry/viewPinnedImage";

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
    <BasicDialog open={!!props.selectedImageGrid}
                 handleRequestClose={props.handleRequestClose}
                 fullScreen={props.fullScreen}
                 title={props.title}
    >
      <ImageGrid selectedUploads={props.selectedImageGrid}
                     handleClickOpen={props.handleClickOpen}/>
    </BasicDialog>
  )
};

class ViewJob extends Component {
  constructor() {
    super();

    this.state = {
      currentJob: null,
      entries: [],
      promiseResolved: false,
      attachmentDialogOpen: false,
      openAttachment: null,
      selectedImageGrid: false,
      selectedPinnedImage: false,
      showSnackbar: false,
      snackbarMsg: '',
      markedImageLoaded: false,
      loading: true
    };

    this.firebase = new FirebaseList('jobs');

    this.handleJobStatusChange = this.handleJobStatusChange.bind(this);
    this.handleImageGridShow = this.handleImageGridShow.bind(this);
    this.handleImageGridClose = this.handleImageGridClose.bind(this);
    this.handlePinnedImageClose = this.handlePinnedImageClose.bind(this);
    this.handlePinnedImageShow = this.handlePinnedImageShow.bind(this);
    this.handleMarkedImageLoaded = this.handleMarkedImageLoaded.bind(this);
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

  handleImageGridShow(imageGrid) {
    this.setState({selectedImageGrid: imageGrid})
  }

  handleImageGridClose() {
    this.setState({selectedImageGrid: false})
  }

  handlePinnedImageShow(pinnedImage) {
    this.setState({selectedPinnedImage: pinnedImage})
  }

  handlePinnedImageClose() {
    this.setState({selectedPinnedImage: false})
  }

  handleMarkedImageLoaded() {
    this.setState({markedImageLoaded: true})
  }

  render() {
    const { classes } = this.props;
    let {_, costPerItem} = calculateTotalPerProduct(this.state.entries);
    let confirmDelete = (msg) => {
      const r = window.confirm(msg);
      return r === true;
    };
    if (this.state.loading) {
      return <Spinner />
    } else {
      return (
        <div className={styles.wrapper}>
          {this.state.currentJob &&
          <div>
            <div className={classes.wrapper}>
              <Button raised color="primary" onClick={() => {
                if (confirmDelete("Confirm push live to client")) {
                  this.pushLiveToClient()
                }
              }}>push live to client</Button>
              <Button onClick={() => {
                if (confirmDelete()) {
                  this.handleRemove("Confirm deletion of job")
                }
              }}>⚠️ Delete</Button>
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
            {this.state.currentJob.selectedUploads && this.state.currentJob.selectedUploads.length > 0
              ? <ViewAttachmentDetails currentJob={this.state.currentJob} handleClickOpen={this.handleClickOpen}/>
              : null}
            <ViewEventLogDetails jobId={this.state.currentJob.jobId}
                                 jobKey={this.state.currentJob.id}
                                 entries={this.state.entries}
                                 handlePinnedImageShow={this.handlePinnedImageShow}
                                 handleImageGridShow={this.handleImageGridShow}/>
            <ViewSummaryDetails stats={costPerItem}/>
            <ViewJobAttachment open={this.state.attachmentDialogOpen}
                               handleRequestClose={this.handleAttachmentDialogClose}
                               attachment={this.state.openAttachment}
            />
            {this.state.selectedImageGrid &&
            <ImageGridDialog selectedImageGrid={this.state.selectedImageGrid}
                             handleRequestClose={this.handleImageGridClose}
                             handleClickOpen={this.handleClickOpen}
                             title="Pictures for job"
                             fullScreen={false}/>}
            {this.state.selectedPinnedImage &&
            <ViewPinnedImageDialog attachment={this.state.selectedPinnedImage}
                                   open={!!this.state.selectedPinnedImage}
                                   markedImageLoaded={this.state.markedImageLoaded}
                                   handleMarkedImageLoaded={this.handleMarkedImageLoaded}
                                   handleRequestClose={this.handlePinnedImageClose}
            />
            }

            <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                            handleSnackbarClose={this.handleSnackbarClose}
                            snackbarMsg={this.state.snackbarMsg}/>

          </div>}
        </div>
      );
    }
  }
}

export default withStyles(styles)(ViewJob);

