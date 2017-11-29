import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {calculateCost} from "../../../utils/jobsService";

export const ListProductTableItemizedRow = (props) => {
  const product = props.selectedProducts && props.selectedProducts[0];
  return (
    <TableRow>
      <TableCell>{product && `Entry #${props.index}`}</TableCell>
      <TableCell>{product && product.name}</TableCell>
      <TableCell>Measurement</TableCell>
      <TableCell>{product && product.productQuantity}</TableCell>
      <TableCell>{product && calculateCost(product, "product")}</TableCell>
      <TableCell>{product && calculateCost(product, "client")}</TableCell>
    </TableRow>
  )
};
