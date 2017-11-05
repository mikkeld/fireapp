import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ListClientsTable from "./listClientsTable";


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

export const ViewClientsDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Clients listed for job
      </Typography>
      <Paper className={classes.root}>
        <ListClientsTable clients={props.currentJob.selectedClients}/>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewClientsDetails);