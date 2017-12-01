import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {formatCurrency, formatNumber} from "../../../utils/utils";

export const ListClientTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>Measurement</TableCell>
      <TableCell>{formatNumber(props.totalMeasurement)}</TableCell>
      <TableCell>{formatCurrency(props.clientCost)}</TableCell>
    </TableRow>
  )
};
