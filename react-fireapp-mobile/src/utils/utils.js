export const formatTimestamp = (timestamp) => {
  const t = new Date(timestamp);
  const ISO = t.toISOString();
  const formattedIsoString = ISO.substring(0,10) + ' ' +ISO.substring(11, 16);
  return formattedIsoString
};

export const findItemById = (items, id) => {
  return items.find((item) => item.id === id)
};

export const updatedItems = (items, updatedItems) => {
  const updatedIndex = items.findIndex(item => item.id === updatedItems.id);
  return [
    ...items.slice(0, updatedIndex),
    updatedItems,
    ...items.slice(updatedIndex+1)
  ];
};

export const removeItem = (items, id) => {
  const removedIndex = items.findIndex(item => item.id === id);
  return [
    ...items.slice(0, removedIndex),
    ...items.slice(removedIndex+1)
  ]
};
