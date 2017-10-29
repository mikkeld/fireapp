import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 0,
    marginRight: 20,
    width: 200,
  },
  textFieldSelect: {
    marginLeft: 0,
    marginRight: 20,
    width: 200,
    marginTop: 25
  },
  menu: {
    width: 200,
  },
  contentStyle: {
    width: '90%',
    height: '90%'
  },
  createNewMenuItem: {
    color: "green"
  }
});


export const CreateCompanyForm = (props) => {
  const { classes } = props;
  let confirmDelete = () => {
    const r = window.confirm("Confirm deletion of company");
    return r === true;
  };

  return (
    <div>
      <Dialog open={props.open}
              onRequestClose={props.handleRequestClose}>
        <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}  noValidate autoComplete="off">
          <DialogTitle>{props.isEditting ? "Edit company " + props.name : "Create new company"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update company details
            </DialogContentText>
            <TextField
              error={props.nameError !== ''}
              helperText={props.nameError || "Example: Company name"}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              fullWidth
              onChange={props.handleInputChange('name')}
              value={props.name} />
             <TextField
              error={props.contactNumberError !== ''}
              helperText={props.contactNumberError || "Example: 0831720214"}
              margin="dense"
              id="contactNumber"
              label="Phone number"
              name="contactNumber"
              className={classes.textField}
              onChange={props.handleInputChange('contactNumber')}
              value={props.contactNumber} />
            <TextField
              error={props.emailError !== ''}
              helperText={props.emailError || "Example: test@test.com"}
              margin="dense"
              id="name"
              label="Email"
              name="email"
              className={classes.textField}
              onChange={props.handleInputChange('email')}
              value={props.email} />
            <TextField
              helperText={"Example: Address 1"}
              margin="dense"
              id="address1"
              label="Address Line 1"
              name="address1"
              className={classes.textField}
              onChange={props.handleInputChange('address1')}
              value={props.address1} />
            <TextField
              helperText={"Example: Address 2"}
              margin="dense"
              id="address2"
              label="Address Line 2"
              name="address2"
              className={classes.textField}
              onChange={props.handleInputChange('address2')}
              value={props.address2} />
            <TextField
              helperText={"Example: Address 3"}
              margin="dense"
              id="address3"
              label="Address Line 3"
              name="address3"
              className={classes.textField}
              onChange={props.handleInputChange('address3')}
              value={props.address3} />
            <TextField
              helperText={"Example: Dublin"}
              margin="dense"
              id="county"
              label="Country"
              name="county"
              className={classes.textField}
              onChange={props.handleInputChange('county')}
              value={props.county} />
            <TextField
              id="notes"
              label="notes"
              multiline
              rows="4"
              value={props.notes}
              onChange={props.handleInputChange('notes')}
              margin="normal"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {props.isEditting
              ? <Button onClick={() => { if(confirmDelete()) {props.handleRemove(props.id)}}}>⚠️ Delete</Button>
              : null
            }
            <Button color="primary" onClick={props.handleRequestClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">{props.isEditting ? "Edit" : "Save"}</Button>

          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
};

export default withStyles(styles)(CreateCompanyForm);