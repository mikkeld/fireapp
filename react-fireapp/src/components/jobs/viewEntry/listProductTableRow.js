import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {calculateCost} from "../../../utils/jobsService";
import ModeEditIcon from 'material-ui-icons/ModeEdit';

export const ListProductTableRow = (props) => {
  return (
    <TableRow>
      {props.isEditing && <TableCell><a onClick={() => props.toggleEdit(props.id)}><ModeEditIcon/></a></TableCell>}
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.productQuantity}</TableCell>
      <TableCell>Total measurement</TableCell>
      <TableCell>{calculateCost(props, "product")}</TableCell>
      <TableCell>{calculateCost(props, "client")}</TableCell>
    </TableRow>
  )
};
