import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

import {
  Link
} from 'react-router-dom';
import {formatTimestamp} from "../../utils/utils";

export const EntryTableRow = (props) => {
  return (
    <Link to={{ pathname: `/editEntry/${props.jobKey}/${props.id}`}} style={{textDecoration: 'none'}}>
      <ListItem button>
        <Avatar>
          <FolderIcon />
        </Avatar>
        <ListItemText primary={props.jobId + '-' + props.index} secondary={`Date created: ${formatTimestamp(props.creationDate)}`} />
      </ListItem>
    </Link>
  )
};