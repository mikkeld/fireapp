import React  from 'react';
import {TableCell, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import {formatCurrency, formatNumber, formatTimestamp} from "../../../utils/utils";
import IconButton from 'material-ui/IconButton';
import CollectionsIcon from 'material-ui-icons/Collections';
import PlaceIcon from 'material-ui-icons/Place';
import {calculateCost} from "../../../utils/jobsService";
import { ViewJobDialogOptions } from "../../../utils/jobs/viewJobDialogOptions";

export const ListEntryTableRow = (props) => {
  return (
    <TableRow>
      <TableCell><Link to={{ pathname: `/entries/${props.jobKey}/${props.id}` }}>View</Link></TableCell>
      <TableCell>{props.jobId + ' ' + props.index}</TableCell>
      <TableCell>{formatTimestamp(props.creationDate)}</TableCell>
      <TableCell>{props.username}</TableCell>
      <TableCell>
        <IconButton disabled={!props.selectedUploads}
                    onClick={() => props.handleDialogShow(props.selectedUploads, ViewJobDialogOptions.IMAGE_GRID)}>
          <CollectionsIcon/>
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton disabled={!props.selectedMarkedImage}
                    onClick={() => props.handleDialogShow(props.selectedMarkedImage, ViewJobDialogOptions.PINNED_IMAGE)}>
          <PlaceIcon/>
        </IconButton>
      </TableCell>
      <TableCell>{props.product.name}</TableCell>
      <TableCell>{formatNumber(props.product.productQuantity)}</TableCell>
      <TableCell>{formatCurrency(calculateCost(props.product, "product"))}</TableCell>
      <TableCell>{formatCurrency(calculateCost(props.product, "client"))}</TableCell>
    </TableRow>
  )
};

