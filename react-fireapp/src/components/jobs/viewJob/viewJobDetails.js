import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {formatTimestamp} from "../../../utils/utils";


const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  textHeader: {
    display: 'block',
    color: 'grey',
    fontSize: '70%'
  },
  wrapper: {
    marginBottom: theme.spacing.unit*2,
  },
  inline: {
    float: 'left',
    paddingRight: theme.spacing.unit*2,
  },
  clearBoth: {
    clear: 'both',
    marginBottom: theme.spacing.unit*2,
  }
});

export const ViewJobDetails = (props) => {
  const { classes } = props;
  return (
    <div>
      <Typography type="subheading" color="secondary">
        Job details
      </Typography>
      <Paper className={classes.root}>
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Job ID</span>
          <span>{props.currentJob.jobId}</span>
        </div>
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Job Name</span>
          <span>{props.currentJob.jobName}</span>
        </div>
        <div className={classes.inline}>
          <span className={classes.textHeader}>Start Date</span>
          <span>{props.currentJob.startDate || "N/A"}</span>
        </div>
        <div className={classes.inline}>
          <span className={classes.textHeader}>Last Updated</span>
          <span>2017-10-02</span>
        </div>
        <div className={classes.inline}>
          <span className={classes.textHeader}>Last Pushed to Client</span>
          <span>{props.currentJob.lastPushedToClient ? formatTimestamp(props.currentJob.lastPushedToClient) : "N/A"}</span>
        </div>
        <div className={classes.clearBoth} />
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Job Address</span>
          <span>{props.currentJob.address1 || 'N/A'}</span><br />
          <span>{props.currentJob.address2 || 'N/A'}</span><br />
          <span>{props.currentJob.address3 || 'N/A'}</span><br />
        </div>
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Job Description</span>
            <span>{props.currentJob.description}</span>
        </div>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewJobDetails);
