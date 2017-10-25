import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {TestForm} from "../../components/admin/users/testDialog";


export class Companies extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <TestForm open={this.state.open} handleRequestClose={this.handleRequestClose}/>

        {/*<Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>*/}
          {/*<DialogTitle>Subscribe</DialogTitle>*/}
          {/*<DialogContent>*/}
            {/*<DialogContentText>*/}
              {/*To subscribe to this website, please enter your email address here. We will send*/}
              {/*updates occationally.*/}
            {/*</DialogContentText>*/}
            {/*<TextField*/}
              {/*autoFocus*/}
              {/*margin="dense"*/}
              {/*id="name"*/}
              {/*label="Email Address"*/}
              {/*type="email"*/}
              {/*fullWidth*/}
            {/*/>*/}
          {/*</DialogContent>*/}
          {/*<DialogActions>*/}
            {/*<Button onClick={this.handleRequestClose} color="primary">*/}
              {/*Cancel*/}
            {/*</Button>*/}
            {/*<Button onClick={this.handleRequestClose} color="primary">*/}
              {/*Subscribe*/}
            {/*</Button>*/}
          {/*</DialogActions>*/}
        {/*</Dialog>*/}
      </div>
    );
  }
}

