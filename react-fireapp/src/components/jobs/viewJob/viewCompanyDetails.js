import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  marginWrapper: {
    marginTop: theme.spacing.unit*2
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

export const ViewCompanyDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.marginWrapper}>
      <Typography type="subheading" color="secondary">
        Companies listed for job
      </Typography>
      <Paper className={classes.root}>
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Company Name</span>
          <span>{props.currentJob.selectedCompany.name}</span>
        </div>
        <div className={classes.inline}>
          <span className={classes.textHeader}>Company Email</span>
          <span>{props.currentJob.selectedCompany.email}</span>
        </div>
        <div className={classes.inline}>
          <span className={classes.textHeader}>Company Phone</span>
          <span>{props.currentJob.selectedCompany.contactNumber}</span>
        </div>
        <div className={classes.clearBoth} />
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Company Address</span>
          <span>Company address: {props.currentJob.selectedCompany.address1}</span><br />
          <span>Company address: {props.currentJob.selectedCompany.address2}</span>
        </div>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewCompanyDetails);