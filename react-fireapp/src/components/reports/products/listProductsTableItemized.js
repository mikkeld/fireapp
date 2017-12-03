import React  from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {ListProductTableItemizedRow} from "./listProductTableItemizedRow";
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


const ListProductsTableItemized = (props) => {
  return (
    <Table className={props.classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Tag ID</TableCell>
          <TableCell>Product Name</TableCell>
          <TableCell>Measurement</TableCell>
          <TableCell>Total Measurement</TableCell>
          <TableCell>Product Cost</TableCell>
          <TableCell>Client Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.entries.map((entry, index) =>
          entry.selectedProducts.map(product => {
            const key = `${entry.id}-${product.name}`;
            return (
              <ListProductTableItemizedRow key={key}
                                           index={index}
                                           {...entry}
                                           product={product}
              />
            )
          })
        )}
      </TableBody>
    </Table>
  )
};

export const ViewItemizedTable = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Products Used Itemised
      </Typography>
      <Paper className={classes.root}>
        <ListProductsTableItemized entries={props.entries} classes={classes}/>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewItemizedTable);



