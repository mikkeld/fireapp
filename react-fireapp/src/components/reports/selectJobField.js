import React  from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  menu: {
    width: 200,
  },
  select: {
    width: 300,
  }

});

const SelectJobField = props => {
  const {classes} = props;
  return (
    <TextField
      id="job"
      select
      className={classes.select}
      label="Jobs"
      margin="normal"
      value={props.selectedJob}
      onChange={props.handleInputChange()}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
        name: "name"
      }}>
      {props.availableJobs.map(job => (
        <MenuItem key={job.jobId} value={job.id}>
          {job.jobId}
        </MenuItem>
      ))}
    </TextField>
  )
};

export default withStyles(styles)(SelectJobField);