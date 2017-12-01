import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {calculateCost} from "../../../utils/jobsService";
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import {formatCurrency} from "../../../utils/utils";

export const ListProductTableRow = (props) => {
  return (
    <TableRow>
      {props.isEditing && <TableCell><a onClick={() => props.toggleEdit(props.id)}><ModeEditIcon/></a></TableCell>}
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.productQuantity}</TableCell>
      <TableCell>Total measurement</TableCell>
      <TableCell>{formatCurrency(calculateCost(props, "product"))}</TableCell>
      <TableCell>{formatCurrency(calculateCost(props, "client"))}</TableCell>
    </TableRow>
  )
};
