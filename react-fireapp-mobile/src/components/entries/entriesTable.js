import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import {EntryTableRow} from "./entryTableRow";


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

export const EntriesTable = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {props.entries.map(entry => {
          return <EntryTableRow key={entry.id} {...entry} />
        })}
      </List>
    </div>
  );
};

export default withStyles(styles)(EntriesTable);


