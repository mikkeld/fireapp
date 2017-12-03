import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {calculateCost} from "../../../utils/jobsService";
import {formatCurrency, formatNumber} from "../../../utils/utils";

export const ListProductTableItemizedRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.product && `Entry #${props.index}`}</TableCell>
      <TableCell>{props.product && props.product.name}</TableCell>
      <TableCell>{props.product && props.product.pricing}</TableCell>
      <TableCell>{props.product && formatNumber(props.product.productQuantity)}</TableCell>
      <TableCell>{props.product && formatCurrency(calculateCost(props.product, "product"))}</TableCell>
      <TableCell>{props.product && formatCurrency(calculateCost(props.product, "client"))}</TableCell>
    </TableRow>
  )
};
