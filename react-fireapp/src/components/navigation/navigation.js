import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { withStyles } from 'material-ui/styles';

import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';

import {
  Link
} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ResponsiveDrawer extends React.Component {
  return (
    <List className={classes.root} subheader={<ListSubheader>Nested List Items</ListSubheader>}>
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText inset primary="Sent mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText inset primary="Drafts" />
      </ListItem>
      <ListItem button onClick={this.handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Inbox" />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
        <Link to={{ pathname: "/admin"}}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Starred2" />
          </ListItem>
        </Link>
      </Collapse>
    </List>
  )
};

export default withStyles(styles, { withTheme: true })(Navigation);