import React  from 'react';
import {ListUsersTableRow} from "./listUserTableRow";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import WithLoader from "../../../HOCs/loader";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    // flex: 1,
  },
  table: {
    width: '100%'
  },
});

export const ListUsersTable = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map(user => <ListUsersTableRow key={user.id} {...user} toggleEdit={props.toggleEdit}/>)}
        </TableBody>
      </Table>
    </Paper>
  )
};

export default withStyles(styles)(WithLoader('users')(ListUsersTable));
