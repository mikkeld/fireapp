import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import {formatTimestamp} from "../../../utils/utils";
import IconButton from 'material-ui/IconButton';
import CollectionsIcon from 'material-ui-icons/Collections';
import PlaceIcon from 'material-ui-icons/Place';
import {calculateCost} from "../../../utils/jobsService";

export const ListEntryTableRow = (props) => {
  return (
    <TableRow>
      <TableCell><Link to={{ pathname: `/entries/${props.jobKey}/${props.id}` }}>View</Link></TableCell>
      <TableCell>{props.jobId + ' ' + props.index}</TableCell>
      <TableCell>{formatTimestamp(props.creationDate)}</TableCell>
      <TableCell>{props.username}</TableCell>
      <TableCell>
        <IconButton onClick={() => console.log("test")}>
          <CollectionsIcon/>
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => console.log("test")}>
          <PlaceIcon/>
        </IconButton>
      </TableCell>
      <TableCell>{props.selectedProducts[0].name}</TableCell>
      <TableCell>{props.selectedProducts[0].productQuantity}</TableCell>
      <TableCell>{calculateCost(props.selectedProducts[0], "product")}</TableCell>
      <TableCell>{calculateCost(props.selectedProducts[0], "client")}</TableCell>
    </TableRow>
  )
};

