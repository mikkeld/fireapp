import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import {JobTableRow} from "./jobsTableRow";


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

export const JobsTable = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {props.jobs.map(job => {
          return <JobTableRow key={job.id} {...job} />
        })}
      </List>
    </div>
  );
};

export default withStyles(styles)(JobsTable);


