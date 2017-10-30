import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';


export const ListJobTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>View</TableCell>
      <TableCell>Job Reports</TableCell>
      <TableCell>{props.jobName}</TableCell>
      <TableCell>Status (need to add)</TableCell>
      <TableCell>{props.selectedCompany.name}</TableCell>
      <TableCell>Client (should we show all?)</TableCell>
      <TableCell>Last update (need to build)</TableCell>
      <TableCell>Last pushed to client (need to build)</TableCell>
      <TableCell>Cost To Date (need to build)</TableCell>
    </TableRow>

  )
};

