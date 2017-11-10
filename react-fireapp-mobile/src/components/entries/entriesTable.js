import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import {EntryTableRow} from "./entryTableRow";


const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
});

export const EntriesTable = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {props.entries.map((entry, index) => {
          return <EntryTableRow key={entry.id} {...entry}
                                jobId={props.jobId}
                                jobKey={props.jobKey}
                                index={index} />
        })}
      </List>
    </div>
  );
};

export default withStyles(styles)(EntriesTable);


