import React, {Component}  from 'react';
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
          {props.isEditing && <TableCell>Edit</TableCell>}
          <TableCell>Product Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total measurement</TableCell>
          <TableCell>Product cost</TableCell>
          <TableCell>Client cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.products.map(product => <ListProductTableRow key={product.id}
                                                            {...product}
                                                            isEditing={props.isEditing}
                                                            toggleEdit={props.toggleEdit}/>)}
      </TableBody>
    </Table>
  )
};

export default withStyles(styles)(ListProductsTable);



