import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const ResetEmailDialog = (props) => {
  return (
    <Dialog open={props.open} onRequestClose={props.handleRequestClose}>
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email and we will send you a new password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="resetEmailField"
          name="resetEmailField"
          label="Email Address"
          type="email"
          value={props.resetEmailField}
          onChange={props.handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleResetEmail} color="primary">
          Reset password
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default ResetEmailDialog;
