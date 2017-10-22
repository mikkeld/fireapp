import React  from 'react';

export const ListUsersTableRow = (props) => {
  return (
    <tr>
      <td><a onClick={() => props.toggleEdit(props.id)}>Edit</a></td>
      <td>{props.firstName + ' ' + props.lastName}</td>
      <td>{props.username}</td>
      <td>{props.email}</td>
      <td>{props.company}</td>
      <td>{props.contactNumber}</td>
      <td>{props.role}</td>
      <td>{props.status}</td>
    </tr>
  )
};
