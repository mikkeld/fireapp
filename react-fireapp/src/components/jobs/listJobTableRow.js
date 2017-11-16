import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import {formatTimestamp} from "../../utils/utils";


export const ListJobTableRow = (props) => {
  return (
    <TableRow>
      <TableCell><Link to={{ pathname: `/jobs/${props.id}` }}>View</Link></TableCell>
      <TableCell>Job Reports</TableCell>
      <TableCell>{props.jobName}</TableCell>
      <TableCell>{props.completed ? "Completed" : "In Progress"}</TableCell>
      <TableCell>{props.selectedCompany.name}</TableCell>
      <TableCell>Client (should we show all?)</TableCell>
      <TableCell>Last update (need to build)</TableCell>
      <TableCell>{props.lastPushedToClient ? formatTimestamp(props.lastPushedToClient) : "N/A"}</TableCell>
      <TableCell>Cost To Date (need to build)</TableCell>
    </TableRow>
  )
};

