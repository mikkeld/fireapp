import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import {formatCurrency, formatNumber, formatTimestamp} from "../../../utils/utils";
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
        <IconButton disabled={!props.selectedUploads} onClick={() => props.handleImageGridShow(props.selectedUploads)}>
          <CollectionsIcon/>
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton disabled={!props.selectedMarkedImage} onClick={() => props.handlePinnedImageShow(props.selectedMarkedImage)}>
          <PlaceIcon/>
        </IconButton>
      </TableCell>
      <TableCell>{props.selectedProducts[0].name}</TableCell>
      <TableCell>{formatNumber(props.selectedProducts[0].productQuantity)}</TableCell>
      <TableCell>{formatCurrency(calculateCost(props.selectedProducts[0], "product"))}</TableCell>
      <TableCell>{formatCurrency(calculateCost(props.selectedProducts[0], "client"))}</TableCell>
    </TableRow>
  )
};

