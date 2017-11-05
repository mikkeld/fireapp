import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';


export const ListClientTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.firstName}</TableCell>
      <TableCell>{props.lastName}</TableCell>
      <TableCell>{props.username}</TableCell>
      <TableCell>{props.company}</TableCell>
      <TableCell>{props.email}</TableCell>
      <TableCell>{props.contactNumber}</TableCell>
    </TableRow>

  )
};

