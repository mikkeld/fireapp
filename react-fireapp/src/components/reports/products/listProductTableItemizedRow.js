import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {calculateCost} from "../../../utils/jobsService";
import {formatCurrency, formatNumber} from "../../../utils/utils";

export const ListProductTableItemizedRow = (props) => {
  const product = props.selectedProducts && props.selectedProducts[0];
  return (
    <TableRow>
      <TableCell>{product && `Entry #${props.index}`}</TableCell>
      <TableCell>{product && product.name}</TableCell>
      <TableCell>Measurement</TableCell>
      <TableCell>{product && formatNumber(product.productQuantity)}</TableCell>
      <TableCell>{product && formatCurrency(calculateCost(product, "product"))}</TableCell>
      <TableCell>{product && formatCurrency(calculateCost(product, "client"))}</TableCell>
    </TableRow>
  )
};
