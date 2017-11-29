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

export const generateFilename = (file) => file.name.split('.')[0] + '_' + Date.now() + file.name.split('.')[1];

export const snapshotToArray = (snapshot) => {
  let items = [];
  snapshot.forEach(function(item) {
    let itemVal = item.val();
    itemVal["id"] = item.key;
    items.push(itemVal);
  });
  return items
};