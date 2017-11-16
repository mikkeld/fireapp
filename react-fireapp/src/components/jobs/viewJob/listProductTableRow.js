import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';


export const ListProductTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.pricing}</TableCell>
      <TableCell>{props.productPrice}</TableCell>
      <TableCell>{props.clientPrice}</TableCell>
    </TableRow>
  )
};

