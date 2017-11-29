import React, {Component} from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import CheckIcon from 'material-ui-icons/Check';
import Slide from 'material-ui/transitions/Slide';
import {MarkedImage} from "./markedImage";
import { withStyles } from 'material-ui/styles';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class ViewPinnedImageDialog extends Component {
  render() {
    const {classes} = this.props;
    const appBarTitle = this.props.isEditing ? "Place marker" : "";
    return (
      <div>
        <Dialog
          open={this.props.open}
          fullScreen
          onRequestClose={() => this.props.handleRequestClose()}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="contrast" onClick={() =>this.props.handleRequestClose()} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                {appBarTitle}
              </Typography>
              {this.props.isEditing &&
              <IconButton color="contrast" onClick={this.props.saveMarkedImage}>
                <CheckIcon />
              </IconButton>}
            </Toolbar>
          </AppBar>
          {this.props.attachment &&
            <div>
              <DialogTitle>{this.props.attachment.name}</DialogTitle>
              <MarkedImage markerPosition={this.props.attachment.position}
                           attachment={this.props.attachment.attachment}
                           imageLoaded={this.props.markedImageLoaded}
                           handleImageLoaded={this.props.handleMarkedImageLoaded}
                           setMarker={this.props.isEditing && this.props.setMarker}
                           otherMarkedEntries={this.props.otherMarkedEntries}
              />
            </div>
          }
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ViewPinnedImageDialog);
