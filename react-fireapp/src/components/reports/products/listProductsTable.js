import React  from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {ListProductTableRow} from "./listProductTableRow";
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  boldRow: {
    fontWeight: 'bold'
  },
  wrapper: {
    marginTop: theme.spacing.unit*2
  }
});

const TotalRow = (props) => (
  <TableRow>
    <TableCell className={props.classes.boldRow}>Totals</TableCell>
    <TableCell className={props.classes.boldRow}>{""}</TableCell>
    <TableCell className={props.classes.boldRow}>{props.totalMeasurement}</TableCell>
    <TableCell className={props.classes.boldRow}>{props.productCost}</TableCell>
    <TableCell className={props.classes.boldRow}>{props.clientCost}</TableCell>
  </TableRow>
);

const ListProductsTable = (props) => {
  const productNames = Object.keys(props.products);
  return (
    <Table className={props.classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>Measurement</TableCell>
          <TableCell>Total Measurement</TableCell>
          <TableCell>Product Cost</TableCell>
          <TableCell>Client Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {productNames.map(productName => <ListProductTableRow key={productName}
                                                              name={productName}
                                                              {...props.products[productName]}
        />)}
        <TotalRow classes={props.classes} {...props.total}/>
      </TableBody>
    </Table>
  )
};


export const ViewTotalProductTable = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Products Used Total
      </Typography>
      <Paper className={classes.root}>
        <ListProductsTable products={props.products} total={props.total} classes={classes}/>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewTotalProductTable);



