import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import ListUsersTable from "../../components/admin/users/listUsersTable";
import {deleteUser, loadUsers, updateUser} from "../../utils/userService";
import CreateUserForm from "../../components/admin/users/createUserForm";
import {createUser} from "../../utils/userService";
import {findUserById, updatedUsers, removeUser} from "../../utils/utils";
import SimpleSnackbar from '../../components/snackbar';

const initialFormState = {
  id: 0,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  company: 'none',
  role: 'client',
  notes: '',
  status: 'active',
  password: ''
};

const initialFormErrorState = {
  usernameError: '',
  firstNameError: '',
  lastNameError: '',
  emailError: '',
  companyError: '',
  passwordError: ''
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

export class User extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      createUserVisible: false,
      open: false,
      showSnackbar: false,
      snackbarMsg: '',
      message: '',
      search: '',
      isEditting: false,
      currentUser: initialFormState,
      formErrors: initialFormErrorState
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
  }

  componentDidMount() {
    loadUsers()
      .then(users => this.setState({users}))
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      const newUser = {
        ...this.state.currentUser,
        id: this.generateRandom()
      };

      const updatedUsers = [...this.state.users, newUser];
      this.setState({
        users: updatedUsers
      });
      createUser(newUser)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("User created");
        })
    }
  };

  handleEdit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.setState({
        users: updatedUsers(this.state.users, this.state.currentUser)
      });
      updateUser(this.state.currentUser)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("User updated");
        })
    }
  }

  handleRemove = (id) => {
    const updated = removeUser(this.state.users, id);
    this.setState({users: updated, currentUser: initialFormState});
    deleteUser(id)
      .then(() => {
        this.handleRequestClose();
        this.handleSnackbarShow("User deleted");
      })
  };

  validate() {
    const errors = {...initialFormErrorState};
    let isError = false;

    if(this.state.currentUser.username === '' ||
      (this.state.users.findIndex(user => user.username === this.state.currentUser.username) !== -1 && !this.state.isEditting)) {
      errors.usernameError = "Invalid username or the username already exists";
      isError = true
    }
    if(this.state.currentUser.firstName === '') {
      errors.firstNameError = "First name cannot be empty";
      isError = true;
    }
    if(this.state.currentUser.lastName === '') {
      errors.lastNameError = "Last name cannot be empty";
      isError = true;
    }
    if(this.state.currentUser.email === '' || this.state.currentUser.email.indexOf('@') === -1) {
      errors.emailError = "Invalid email address";
      isError = true;
    }
    if(this.state.currentUser.company === 'none' || this.state.currentUser.company === '') {
      errors.companyError = "Invalid company name";
      isError = true;
    }
    if(this.state.currentUser.password.length < 6) {
      errors.passwordError = "The password must be at least 6 characters";
      isError = true;
    }

    this.setState({formErrors: errors});

    return isError
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({ currentUser: { ...this.state.currentUser, [name]: value } });
  };

  toggleEdit(id){
    const editingUser = findUserById(this.state.users, id);
    this.handleClickOpen();
    this.setState({
      currentUser: editingUser,
      isEditting: true
    });
  }

  generateRandom() {
    return parseInt(Math.random());
  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({search: e.target.value});
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      currentUser: initialFormState,
      formErrors: initialFormErrorState
    });
  };

  handleSnackbarShow = (msg) => {
    this.setState({
      showSnackbar: true,
      snackbarMsg: msg
    });
  };

  handleSnackbarClose= (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showSnackbar: false });
  };


  render() {
    let filteredUsers = this.state.users.filter(
      (user) => {
        return user.username.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
      <div>
        <h1>Users</h1>
        <div>
          <Button color="primary"
                  onClick={() => {this.handleClickOpen(); this.setState({isEditting: false})}}>
            Create User
          </Button>
          <TextField
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            id="search"
            label="Search username"
            className={styles.textField}
            type="search"
            margin="normal"/>
        </div>
        <ListUsersTable users={filteredUsers} toggleEdit={this.toggleEdit}/>
        {
          <CreateUserForm handleSubmit={this.handleSubmit}
                          handleEdit={this.handleEdit}
                          handleRemove={this.handleRemove}
                          isEditting={this.state.isEditting}
                          handleInputChange={this.handleInputChange}
                          {...this.state.currentUser}
                          {...this.state.formErrors}
                          open={this.state.open}
                          handleRequestClose={this.handleRequestClose}
          />
        }
        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

