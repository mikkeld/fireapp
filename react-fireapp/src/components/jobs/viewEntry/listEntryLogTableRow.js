import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import {formatTimestamp} from "../../../utils/utils";


export const ListEntryLogTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{formatTimestamp(props.lastUpdated)}</TableCell>
      <TableCell>{props.updatedBy}</TableCell>
    </TableRow>
  )
};

