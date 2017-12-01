import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {formatCurrency} from "../../../utils/utils";


export const ListProductTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.pricing}</TableCell>
      <TableCell>{formatCurrency(props.productPrice)}</TableCell>
      <TableCell>{formatCurrency(props.clientPrice)}</TableCell>
    </TableRow>
  )
};

