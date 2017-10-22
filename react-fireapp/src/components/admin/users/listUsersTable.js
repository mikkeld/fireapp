import React  from 'react';
import {ListUsersTableRow} from "./listUserTableRow";

export const ListUsersTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Edit</th>
          <th>Full name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Company name</th>
          <th>Contact number</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => <ListUsersTableRow key={user.id} {...user} toggleEdit={props.toggleEdit}/>)}
      </tbody>
    </table>
  )
};
