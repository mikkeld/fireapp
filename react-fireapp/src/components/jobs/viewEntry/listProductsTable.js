import React, {Component}  from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {ListProductTableRow} from "./listProductTableRow";
import {formatCurrency, formatNumber} from "../../../utils/utils";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  boldRow: {
    fontWeight: 'bold'
  },
});

const TotalRow = (props) => (
  <TableRow>
    <TableCell className={props.classes.boldRow}>Totals</TableCell>
    {props.isEditing && <TableCell className={props.classes.boldRow}>{""}</TableCell>}
    <TableCell className={props.classes.boldRow}>{""}</TableCell>
    <TableCell className={props.classes.boldRow}>{""}</TableCell>
    <TableCell className={props.classes.boldRow}>{""}</TableCell>
    <TableCell className={props.classes.boldRow}>{formatCurrency(props.productCost)}</TableCell>
    <TableCell className={props.classes.boldRow}>{formatCurrency(props.clientCost)}</TableCell>
  </TableRow>
);

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
        <TotalRow classes={props.classes}
                  clientCost={props.clientCost}
                  productCost={props.productCost}
                  isEditing={props.isEditing}/>
      </TableBody>
    </Table>
  )
};

export default withStyles(styles)(ListProductsTable);



