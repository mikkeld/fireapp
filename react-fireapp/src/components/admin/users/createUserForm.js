import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
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
  contentStyle: {
    width: '90%',
    height: '90%'
  },
  dialogContent: {
    overflow: "scroll",
    height: 300,
  },
  rightElement: {
    float: 'right'
  }
});

const roles = [
  {
    name: "worker",
    value: "Worker",
  },
  {
    name: "client",
    value: "Client" ,
  },
  {
    name: "admin",
    value: "Admin"
  }
];

export const CreateUserForm = (props) => {
  const { classes } = props;
  let confirmDelete = () => {
    const r = window.confirm("Confirm deletion of user");
    return r === true;
  };
  return (
    <div>
    <Dialog open={props.open}
            onRequestClose={props.handleRequestClose}>
      <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}  noValidate autoComplete="off">
        <DialogTitle>{props.isEditting ? "Edit user " + props.username : "Create new user"}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {props.isEditting &&
            <FormControlLabel
              className={classes.rightElement}
              control={
                <Switch
                  checked={props.isActive}
                  onChange={props.toggleUserActive}
                />
              }
              label="Active"
            />
          }
          <TextField
            error={props.usernameError !== ''}
            helperText={props.usernameError || "Example: markgram"}
            autoFocus
            required
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
            required
            id="firstName"
            label="First Name"
            name="firstName"
            className={classes.textFieldFirst}
            onChange={props.handleInputChange('firstName')}
            value={props.firstName} />
          <TextField
            error={props.lastNameError !== ''}
            helperText={props.lastNameError || "Example: Gram"}
            margin="dense"
            required
            id="lastName"
            label="Last Name"
            name="lastName"
            className={classes.textFieldSecond}
            onChange={props.handleInputChange('lastName')}
            value={props.lastName} />
          <TextField
            error={props.emailError !== ''}
            helperText={props.emailError || "Example: mark@gram.com"}
            margin="dense"
            id="email"
            required
            label="Email"
            name="email"
            className={classes.textFieldFirst}
            type="email"
            onChange={props.handleInputChange('email')}
            value={props.email} />
          <TextField
            helperText={"Example: 083 172 0214"}
            margin="dense"
            id="contactNumber"
            label="Phone Number"
            name="contactNumber"
            className={classes.textFieldSecond}
            onChange={props.handleInputChange('contactNumber')}
            value={props.contactNumber} />
          <TextField
            id="company"
            select
            required
            error={props.companyError !== ''}
            label="Select Company Name"
            className={classes.textFieldSelectFirst}
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
            {props.companies.map(company => (
              <MenuItem key={company.name} value={company.name}>
                {company.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="role"
            select
            label="Select a role"
            required
            margin="normal"
            className={classes.textFieldSelectSecond}
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
            required
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
            ? <Button onClick={() => { if(confirmDelete()) {props.handleRemove(props.id)}}}>
                ⚠️ Delete
              </Button>
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

CreateUserForm.propTypes = {
  isEditing: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleUserActive: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  contactNumber: PropTypes.string,
  password: PropTypes.string.isRequired,
  notes: PropTypes.string,
  companies: PropTypes.array.isRequired
};

export default withStyles(styles)(CreateUserForm);