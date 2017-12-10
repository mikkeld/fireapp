import React, {Component} from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Spinner from '../shared/spinner';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  popupImg: {
    maxHeight: 400,
    maxWidth: 400
  }
});

export class JobAttachmentDialog extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={!!this.props.attachment}
        onRequestClose={this.props.handleRequestClose}>
        {this.props.attachment &&
        <div>
          <DialogTitle>{this.props.attachment.name}</DialogTitle>
          {this.state.imageLoaded
            ? null
            : <Spinner />
          }
          <img
            src={this.props.attachment.url}
            className={classes.popupImg}
            onLoad={() => this.setState({imageLoaded: true})}
          />
        </div>
        }
      </Dialog>
    )
  }
}

export default withStyles(styles)(JobAttachmentDialog);