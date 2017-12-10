import React, {Component}  from 'react';
import {ListJobTableRow} from "./listJobTableRow";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import HelpIcon from 'material-ui-icons/Help';
import Tooltip from 'material-ui/Tooltip';
import {jobCostsPerJobSinceLastPush} from "../../utils/jobsService";
import WithLoader from "../../HOCs/loader";

const styles = theme => ({
  root: {
    width: "100%",
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
            <TableCell>Job Name</TableCell>
            <TableCell>Job Status</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Latest Entry</TableCell>
            <TableCell>Last Pushed to Client</TableCell>
            <TableCell>
              Cost To Date<br />
              <Tooltip id="tooltip-top" title="Cost up to the latest push to client" placement="top">
                <HelpIcon style={{width: "30%"}}/>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.jobs.map(job => {
            const entries = props.entries.hasOwnProperty(job.id) && Object.values(props.entries[job.id]) || [];
            const jobStats = jobCostsPerJobSinceLastPush(job, entries);
            return <ListJobTableRow key={job.id} {...job} {...jobStats} toggleEdit={props.toggleEdit}/>;
          })}
        </TableBody>
      </Table>
    </Paper>

  )
};

export default withStyles(styles)(WithLoader('jobs')(ListJobsTable));



