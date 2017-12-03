import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {formatCurrency, formatNumber} from "../../../utils/utils";

export const ListProductTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.pricing}</TableCell>
      <TableCell>{formatNumber(props.totalMeasurement)}</TableCell>
      <TableCell>{formatCurrency(props.productCost)}</TableCell>
      <TableCell>{formatCurrency(props.clientCost)}</TableCell>
    </TableRow>
  )
};
