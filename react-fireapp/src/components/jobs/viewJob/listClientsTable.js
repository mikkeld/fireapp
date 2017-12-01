import React, {Component}  from 'react';
import {ListClientTableRow} from "./listClientTableRow";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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

export const ListClientsTable = (props) => {
  const { classes } = props;
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Client First Name</TableCell>
          <TableCell>Client Surname</TableCell>
          <TableCell>Client Username</TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell>Phone Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.clients.map(client => <ListClientTableRow key={client.id} {...client} />)}
      </TableBody>
    </Table>
  )
};

export default withStyles(styles)(ListClientsTable);



