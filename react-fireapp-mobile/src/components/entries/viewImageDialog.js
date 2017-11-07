import React, {Component} from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import {Marker} from "./marker";
import {MarkedImage} from "./markedImage";

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

export class ViewImageDialog extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onRequestClose={this.props.handleRequestClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="contrast" onClick={this.props.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Place Marker
              </Typography>
              <Button color="contrast" onClick={this.props.saveMarkedImage}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          {this.props.attachment &&
          <div>
            <DialogTitle>{this.props.attachment.name}</DialogTitle>
            <MarkedImage setMarker={this.props.setMarker}
                         markerPosition={this.props.markerPosition}
                         attachment={this.props.attachment}
                         imageLoaded={this.props.markedImageLoaded}
                         handleImageLoaded={this.props.handleMarkedImageLoaded}
            />
            {/*{this.state.imageLoaded*/}
              {/*? null*/}
              {/*: <CircularProgress />*/}
            {/*}*/}

            {/*<div style={{position: 'relative'}}>*/}
              {/*<img*/}
                {/*src={this.props.attachment.url}*/}
                {/*onClick={this.props.setMarker}*/}
                {/*onLoad={() => this.setState({imageLoaded: true})}*/}
              {/*/>*/}
              {/*{this.props.markerPosition && <Marker position={this.props.markerPosition}/>}*/}
            {/*</div>*/}
          </div>
          }
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ViewImageDialog);
