import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import ModeEditIcon from 'material-ui-icons/ModeEdit';


export const ListCompanyTableRow = (props) => {
  return (
    <TableRow>
      <TableCell><a onClick={() => props.toggleEdit(props.id)}><ModeEditIcon/></a></TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.contactNumber}</TableCell>
      <TableCell>{props.email}</TableCell>
      <TableCell>{props.notes}</TableCell>
    </TableRow>
  )
};
