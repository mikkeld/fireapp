import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import ModeEditIcon from 'material-ui-icons/ModeEdit';


export const ListUsersTableRow = (props) => {
  return (
    <TableRow>
      <TableCell><a onClick={() => props.toggleEdit(props.id)}><ModeEditIcon/></a></TableCell>
      <TableCell>{props.firstName + ' ' + props.lastName}</TableCell>
      <TableCell>{props.username}</TableCell>
      <TableCell>{props.email}</TableCell>
      <TableCell>{props.company}</TableCell>
      <TableCell>{props.contactNumber}</TableCell>
      <TableCell>{props.role}</TableCell>
      <TableCell>{props.isActive ? 'Active' : 'Inactive'}</TableCell>
    </TableRow>
  )
};
