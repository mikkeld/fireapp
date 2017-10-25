export const findUserById = (users, id) => {
  return users.find((user) => user.id === id)
};

export const updatedUsers = (users, updatedUser) => {
  const updatedIndex = users.findIndex(user => user.id === updatedUser.id);
  return [
    ...users.slice(0, updatedIndex),
    updatedUser,
    ...users.slice(updatedIndex+1)
  ];
};

export const removeUser = (users, id) => {
  const removedIndex = users.findIndex(user => user.id === id);
  return [
    ...users.slice(0, removedIndex),
    ...users.slice(removedIndex+1)
  ]
};
