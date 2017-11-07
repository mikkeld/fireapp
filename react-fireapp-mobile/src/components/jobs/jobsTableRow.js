import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import {
  Link
} from 'react-router-dom';

export const JobTableRow = (props) => {
  return (
    <Link to={{ pathname: `/entries/${props.id}` }}>
      <ListItem button>
        <Avatar>
          <FolderIcon />
        </Avatar>
        <ListItemText primary={props.jobId} secondary={`Location: ${props.jobName}`} />
      </ListItem>
    </Link>
  )
};