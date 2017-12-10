import React  from 'react';
import {ListProductTableRow} from "./listProductTableRow";
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

export const ListProductsTable = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell>Product name</TableCell>
            <TableCell>Pricing method</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map(product => <ListProductTableRow key={product.id} {...product} toggleEdit={props.toggleEdit}/>)}
        </TableBody>
      </Table>
    </Paper>

  )
};

export default withStyles(styles)(WithLoader('products')(ListProductsTable));
