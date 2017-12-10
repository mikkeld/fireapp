import React from 'react';
import { withStyles } from 'material-ui/styles';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit*2
  },
  rightElement: {
    float: 'right'
  }
});

export const ViewJobActions = (props) => {
  const { classes } = props;
  const confirmDelete = (msg) => {
    const r = window.confirm(msg);
    return r === true;
  };
  return (
    <div className={classes.wrapper}>
      <Button raised color="primary" onClick={() => {
        if (confirmDelete("Confirm push live to client")) {
          props.pushLiveToClient()
        }
      }}>push live to client</Button>
      <Button disabled onClick={() => {
        if (confirmDelete("Confirm deletion of job")) {
          props.handleRemove()
        }
      }}>⚠️ Delete</Button>
      <FormControlLabel
        className={classes.rightElement}
        control={
          <Switch
            checked={props.currentJob.completed}
            onChange={props.handleJobStatusChange}
          />
        }
        label="Completed"
      />
    </div>
  )
};

export default withStyles(styles)(ViewJobActions);
