import React, {Component} from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';


export class ViewJobAttachment extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.handleRequestClose}>
        {this.props.attachment &&
        <div>
          <DialogTitle>{this.props.attachment.name}</DialogTitle>
          {this.state.imageLoaded
            ? null
            : <CircularProgress />
          }

          <img
            src={this.props.attachment.url}
            onLoad={() => this.setState({imageLoaded: true})}
          />
        </div>
        }
      </Dialog>
    )
  }
}