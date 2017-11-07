const SERVER = "http://localhost:8080/entries";

export const loadEntriesForJob = (jobId) => {
  const path = `${SERVER}/${jobId}`;
  return fetch(path)
    .then(entries => entries.json())
};

export const createEntry = (jobId, entry) => {
  const path = `${SERVER}`;
  return fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  }).then(res => res.json())
};
