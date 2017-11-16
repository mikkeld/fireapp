import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';

export const ListProductTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>Measurement</TableCell>
      <TableCell>{props.totalMeasurement}</TableCell>
      <TableCell>{props.productCost}</TableCell>
      <TableCell>{props.clientCost}</TableCell>
    </TableRow>
  )
};
