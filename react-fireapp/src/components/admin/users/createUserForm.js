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

import {AlertDialog} from "../../alert";


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
});

const companies = [
  {
    name: "new",
    value: "New Company",
  },
  {
    name: "siac",
    value: "SIAC" ,
  },
  {
    name: "dunwoody",
    value: "Dunwoody & Dobson",
  }

];

const roles = [
  {
    name: "worker",
    value: "Worker",
  },
  {
    name: "client",
    value: "Client" ,
  }
];


export const CreateUserForm = (props) => {
  const { classes } = props;
  return (
    <div>
    <Dialog open={props.open} onRequestClose={props.handleRequestClose} >
      <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}  noValidate autoComplete="off">
        <DialogTitle>{props.isEditting ? "Edit user " + props.username : "Create new user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update user details
          </DialogContentText>
          <TextField
            error={props.usernameError !== ''}
            helperText={props.usernameError || "Example: markgram"}
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            name="username"
            fullWidth
            onChange={props.handleInputChange('username')}
            value={props.username} />
          <TextField
            error={props.firstNameError !== ''}
            helperText={props.firstNameError || "Example: Mark"}
            margin="dense"
            id="firstName"
            label="First Name"
            name="firstName"
            className={classes.textField}
            onChange={props.handleInputChange('firstName')}
            value={props.firstName} />
          <TextField
            error={props.lastNameError !== ''}
            helperText={props.lastNameError || "Example: Gram"}
            margin="dense"
            id="lastName"
            label="Last Name"
            name="lastName"
            className={classes.textField}
            onChange={props.handleInputChange('lastName')}
            value={props.lastName} />
          <TextField
            error={props.emailError !== ''}
            helperText={props.emailError || "Example: mark@gram.com"}
            margin="dense"
            id="email"
            label="Email"
            name="email"
            className={classes.textField}
            type="email"
            onChange={props.handleInputChange('email')}
            value={props.email} />
          <TextField
            helperText={"Example: 083 172 0214"}
            margin="dense"
            id="contactNumber"
            label="Phone Number"
            name="contactNumber"
            className={classes.textField}
            onChange={props.handleInputChange('contactNumber')}
            value={props.contactNumber} />
          <TextField
            id="company"
            select
            error={props.companyError !== ''}
            label="Select Company Name"
            className={classes.textFieldSelect}
            value={props.company}
            onChange={props.handleInputChange('company')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
              name: "company"
            }}
            helperText={props.companyError || "Example: Dunham ltd"}
            margin="normal"
          >
            <MenuItem key="none" value="none">
              <em>None</em>
            </MenuItem>
            {companies.map(option => (
              <MenuItem key={option.name} value={option.name}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="role"
            select
            label="Select a role"
            margin="normal"
            className={classes.textFieldSelect}
            value={props.role}
            onChange={props.handleInputChange('role')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
              name: "role"
            }}
            helperText="Example: Worker, Client"
          >
            {roles.map(option => (
              <MenuItem key={option.name} value={option.name}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={props.passwordError !== ''}
            helperText={props.passwordError || "Example: password123"}
            margin="dense"
            id="password"
            label="Password"
            name="password"
            type="password"
            fullWidth
            onChange={props.handleInputChange('password')}
            value={props.password} />
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
            ? <Button onClick={() => props.handleRemove(props.id)}>⚠️ Delete</Button>
            : null
          }
          <AlertDialog/>
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

export default withStyles(styles)(CreateUserForm);