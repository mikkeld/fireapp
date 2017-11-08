import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import ListUsersTable from "../../components/admin/users/listUsersTable";
import CreateUserForm from "../../components/admin/users/createUserForm";
import {findItemById, updatedItems, removeItem} from "../../utils/utils";
import SimpleSnackbar from '../../components/snackbar';
import Typography from 'material-ui/Typography';
import {FirebaseList} from "../../utils/firebase/firebaseList";

const initialFormState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  company: 'none',
  role: 'client',
  notes: '',
  password: '',
  isActive: true
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

    this.firebase = new FirebaseList('users');

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
    this.toggleUserActive = this.toggleUserActive.bind(this);
  }

  componentDidMount() {
    const previousUsers = this.state.users;

    this.firebase.database.on('child_added', snap => {
      previousUsers.push({
        id: snap.key,
        ...snap.val()
      });

      this.setState({
        users: previousUsers
      })
    });

    this.firebase.database.on('child_changed', snap => {
      const updatedUsers = updatedItems(this.state.users, this.state.currentUser);
      this.setState({
        users: updatedUsers
      })
    });

    this.firebase.database.on('child_removed', snap => {
      const updatedUsers = removeItem(previousUsers, snap.key);
      this.setState({
        users: updatedUsers
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.push(this.state.currentUser)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("User created");
          this.setState({currentUser: initialFormState})
        })
    }
  };

  handleEdit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.update(this.state.currentUser.id, this.state.currentUser)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("User updated");
        })
    }
  }

  handleRemove = (id) => {
    this.setState({currentUser: initialFormState});
    this.firebase.remove(id)
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
    const editingUser = findItemById(this.state.users, id);
    this.handleClickOpen();
    this.setState({
      currentUser: editingUser,
      isEditting: true
    });
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

  toggleUserActive() {
    const newState = !this.state.currentUser.isActive;
    const updatedUser = {
      ...this.state.currentUser,
      'isActive': newState
    };
    this.setState({
      currentUser: updatedUser
    })
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
        <Typography type="title" gutterBottom>
          Users
        </Typography>
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
        {this.state.open}
        <ListUsersTable users={filteredUsers} toggleEdit={this.toggleEdit}/>
        <CreateUserForm handleSubmit={this.handleSubmit}
                        handleEdit={this.handleEdit}
                        handleRemove={this.handleRemove}
                        isEditting={this.state.isEditting}
                        handleInputChange={this.handleInputChange}
                        {...this.state.currentUser}
                        {...this.state.formErrors}
                        open={this.state.open}
                        handleRequestClose={this.handleRequestClose}
                        toggleUserActive={this.toggleUserActive}
        />
        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

