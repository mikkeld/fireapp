import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ListEntryLogTable from "./listEntryLogTable";


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

export const ViewUpdateLog = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Update log
      </Typography>
      <Paper className={classes.root}>
        <ListEntryLogTable updateLog={props.updateLog} />
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewUpdateLog);
