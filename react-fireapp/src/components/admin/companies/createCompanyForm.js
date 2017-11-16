import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldFirst: {
    marginRight: "4%",
    width: "48%",
  },
  textFieldSecond: {
    width: "48%",
  },
  textFieldSelectFirst: {
    marginRight: "4%",
    marginTop: theme.spacing.unit,
    width: "48%",
  },
  textFieldSelectSecond: {
    marginTop: theme.spacing.unit,
    width: "48%",
  },
  menu: {
    width: 200,
  },
  dialogContent: {
    overflow: "scroll",
    height: 300,
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
          <DialogContent className={classes.dialogContent}>
            <TextField
              error={props.nameError !== ''}
              helperText={props.nameError || "Example: Company name"}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              required
              fullWidth
              onChange={props.handleInputChange('name')}
              value={props.name} />
             <TextField
              error={props.contactNumberError !== ''}
              helperText={props.contactNumberError || "Example: 0831720214"}
              margin="dense"
              id="contactNumber"
              required
              label="Phone number"
              name="contactNumber"
              className={classes.textFieldFirst}
              onChange={props.handleInputChange('contactNumber')}
              value={props.contactNumber} />
            <TextField
              error={props.emailError !== ''}
              helperText={props.emailError || "Example: test@test.com"}
              margin="dense"
              id="name"
              required
              label="Email"
              name="email"
              type="email"
              className={classes.textFieldSecond}
              onChange={props.handleInputChange('email')}
              value={props.email} />
            <TextField
              helperText={"Example: Address 1"}
              margin="dense"
              id="address1"
              label="Address Line 1"
              name="address1"
              className={classes.textFieldFirst}
              onChange={props.handleInputChange('address1')}
              value={props.address1} />
            <TextField
              helperText={"Example: Address 2"}
              margin="dense"
              id="address2"
              label="Address Line 2"
              name="address2"
              className={classes.textFieldSecond}
              onChange={props.handleInputChange('address2')}
              value={props.address2} />
            <TextField
              helperText={"Example: Address 3"}
              margin="dense"
              id="address3"
              label="Address Line 3"
              name="address3"
              className={classes.textFieldFirst}
              onChange={props.handleInputChange('address3')}
              value={props.address3} />
            <TextField
              helperText={"Example: Dublin"}
              margin="dense"
              id="county"
              label="Country"
              name="county"
              className={classes.textFieldSecond}
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

CreateCompanyForm.propTypes = {
  isEditing: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  contactNumber: PropTypes.string,
  email: PropTypes.string.isRequired,
  address1: PropTypes.string,
  address2: PropTypes.string,
  address3: PropTypes.string,
  county: PropTypes.string,
  notes: PropTypes.string,

};


export default withStyles(styles)(CreateCompanyForm);