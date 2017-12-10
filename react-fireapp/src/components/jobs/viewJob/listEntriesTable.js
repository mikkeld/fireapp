import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {ListEntryTableRow} from "./listEntryTableRow";

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

export const EntriesTable = (props) => {
  const { classes } = props;
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>View</TableCell>
          <TableCell>Tag ID</TableCell>
          <TableCell>Creation Date</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Pictures</TableCell>
          <TableCell>Map</TableCell>
          <TableCell>Products</TableCell>
          <TableCell>Size/Units</TableCell>
          <TableCell>Cost</TableCell>
          <TableCell>Client Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.entries.map((entry, index) =>
          entry.selectedProducts.map(product => {
            const key = `${entry.id}-${product.name}`;
            return (
              <ListEntryTableRow key={key}
                                 jobId={props.jobId}
                                 jobKey={props.jobKey}
                                 index={index}
                                 handleDialogShow={props.handleDialogShow}
                                 {...entry}
                                 product={product} />
            )
          })
        )}
      </TableBody>
    </Table>
  )
};

export default withStyles(styles)(EntriesTable);