import React  from 'react';

export const CreateUserForm = (props) => {
  return (
    <div>
      <h2>{props.isEditting ? "Edit user " + props.username : "Create new user"}</h2>
      <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}>
        Username: <input name="username" type="text" onChange={props.handleInputChange} value={props.username}/>
        <br />
        First name: <input name="firstName" type="text" onChange={props.handleInputChange} value={props.firstName}/>
        Last name: <input name="lastName" type="text" onChange={props.handleInputChange} value={props.lastName}/>
        <br />
        Company:
        <select name="company" onChange={props.handleInputChange}>
          <option value="Create new company">Create new company</option>
          <option value="Create new company">SIAC</option>
          <option value="Create new company">Dunwoody & Dobson</option>
        </select>
        <br />
        Email address: <input name="email" type="text" onChange={props.handleInputChange} value={props.email}/>
        Contact number: <input name="contactNumber" type="text" onChange={props.handleInputChange} value={props.contactNumber}/>
        <br />
        Role:
        <select name="role" onChange={props.handleInputChange}>
          <option value="client">Client</option>
          <option value="worker">Worker</option>
        </select>
        <br />
        Password: <input name="password" type="password" onChange={props.handleInputChange} value={props.password}/>
        <br />
        <textarea name="notes" height="200" width="400"
                  onChange={props.handleInputChange}
                  value={props.notes}>
        </textarea>
        <br />
        <button type="submit">{props.isEditting ? "Edit" : "Save"}</button>
        <button>Cancel</button>
      </form>
    </div>
  )
};
