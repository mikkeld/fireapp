import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import SummaryField from '../../shared/summaryField';
const styles = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 240px)`,
    },
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  wrapper: {
    marginTop: theme.spacing.unit*2
  },
});

export const ViewSummaryDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Summary
      </Typography>
      <Paper className={classes.root}>
        <SummaryField classes={classes}
                      title="Total Product Cost"
                      metric={props.stats.productCost} />
        <SummaryField classes={classes}
                      title="Total Client Cost"
                      metric={props.stats.clientCost} />
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewSummaryDetails);
