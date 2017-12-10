import React  from 'react';
import {ListCompanyTableRow} from "./ListCompanyTableRow";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import WithLoader from "../../../HOCs/loader";

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

export const ListCompaniesTable = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell>Company name</TableCell>
            <TableCell>Company phone number</TableCell>
            <TableCell>Company email</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.companies.map(company => <ListCompanyTableRow key={company.id} {...company} toggleEdit={props.toggleEdit}/>)}
        </TableBody>
      </Table>
    </Paper>

  )
};

export default withStyles(styles)(WithLoader('companies')(ListCompaniesTable));
