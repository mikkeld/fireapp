import React, { Component } from 'react';
import {ListUsersTable} from "../../components/admin/users/listUsersTable";
import {loadUsers, updateUser} from "../../utils/userService";
import {CreateUserForm} from "../../components/admin/users/createUserForm";
import {createUser} from "../../utils/userService";
import {findUserById, updatedUsers} from "../../utils/utils";

const initialFormState = {
  id: 0,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  company: '',
  role: '',
  notes: '',
  status: "active"
};

export class User extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      createUserVisible: false,
      message: '',
      isEditting: false,
      currentUser: initialFormState
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
  }

  componentDidMount() {
    loadUsers()
      .then(users => this.setState({users}))
  }

  onClick() {
    this.setState({createUserVisible: !this.state.createUserVisible})
  }

  handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      ...this.state.currentUser,
      id: this.generateRandom()
    };

    const updatedUsers = [...this.state.users, newUser];
    this.setState({
      users: updatedUsers,
      currentUser: initialFormState
    });
    createUser(newUser)
      .then(() => this.showTempMessage("User created"))
  };

  handleEdit(e) {
    e.preventDefault();
    this.setState({
      users: updatedUsers(this.state.users, this.state.currentUser)
    });
    updateUser(this.state.currentUser)
      .then(() => this.showTempMessage("User updated"))
  }

  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ currentUser: { ...this.state.currentUser, [name]: value } });
  }

  toggleEdit(id){
    const editingUser = findUserById(this.state.users, id);
    this.setState({
      createUserVisible: true,
      isEditting: true,
      currentUser: editingUser
    });
  }

  generateRandom() {
    return parseInt(Math.random());
  }

  showTempMessage = (msg) => {
    this.setState({message: msg});
    setTimeout(() => this.setState({message: ''}), 2500)
  };

  render() {
    return (
      <div>
        <b>{this.state.message}</b>
        <button onClick={() => this.onClick()}>Create User</button>
        <input type="text" placeholder="Search username/email address" />
        <ListUsersTable users={this.state.users} toggleEdit={this.toggleEdit}/>
        {
          this.state.createUserVisible
            ? <CreateUserForm handleSubmit={this.handleSubmit}
                              handleEdit={this.handleEdit}
                              isEditting={this.state.isEditting}
                              handleInputChange={this.handleInputChange}
                              {...this.state.currentUser}/>
            : null
        }
      </div>
    );
  }
}

