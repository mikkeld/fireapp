import React, {Component}  from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {ListEntryLogTableRow} from './listEntryLogTableRow'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    maxWidth: 300,
  },
});

export const ListEntryLogTable = (props) => {
  const { classes } = props;
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Update date</TableCell>
          <TableCell>Username</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.updateLog.map(row => <ListEntryLogTableRow key={row.id} {...row} />)}
      </TableBody>
    </Table>
  )
};

export default withStyles(styles)(ListEntryLogTable);



