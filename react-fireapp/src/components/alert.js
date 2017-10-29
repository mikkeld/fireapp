import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export class AlertDialog extends React.Component {
  state = {
    open: true,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (!this.props.showAlert) return null;
    return (
      <div>
        <Dialog open={this.state.showAlert}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/*<Button onClick={() => {this.handleRequestClose(); return false}} color="primary">*/}
              {/*Disagree*/}
            {/*</Button>*/}
            {/*<Button onClick={() => {this.handleRequestClose(); return true}} color="primary" autoFocus>*/}
              {/*Agree*/}
            {/*</Button>*/}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}