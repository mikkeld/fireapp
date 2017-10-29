import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import ModeEditIcon from 'material-ui-icons/ModeEdit';


export const ListProductTableRow = (props) => {
  return (
    <TableRow>
      <TableCell><a onClick={() => props.toggleEdit(props.id)}><ModeEditIcon/></a></TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.pricing}</TableCell>
      <TableCell>{props.description}</TableCell>
    </TableRow>
  )
};
