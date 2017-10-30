import React, {Component}  from 'react';
import {ListJobTableRow} from "./listJobTableRow";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

export const ListJobsTable = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>View</TableCell>
            <TableCell>Job Reports</TableCell>
            <TableCell>Job Name</TableCell>
            <TableCell>Job Status</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Last Pushed to Client</TableCell>
            <TableCell>Cost To Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.jobs.map(job => <ListJobTableRow key={job.id} {...job} toggleEdit={props.toggleEdit}/>)}
        </TableBody>
      </Table>
    </Paper>

  )
};

export default withStyles(styles)(ListJobsTable);


