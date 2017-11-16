import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {ListProductTableRow} from "./listProductTableRow";


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
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>Pricing Method</TableCell>
          <TableCell>Product Price</TableCell>
          <TableCell>Client Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.products.map(product => <ListProductTableRow key={product.id} {...product} />)}
      </TableBody>
    </Table>
  )
};

export default withStyles(styles)(ListProductsTable);



