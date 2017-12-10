import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import EntriesTable from "./listEntriesTable";

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  wrapper: {
    marginTop: theme.spacing.unit*2
  }
});

export const ViewEventLogDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Event log
      </Typography>
      <Paper className={classes.root}>
        <EntriesTable jobId={props.jobId}
                      jobKey={props.jobKey}
                      entries={props.entries}
                      handleDialogShow={props.handleDialogShow}/>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewEventLogDetails);
