const SERVER = "http://localhost:8080/entries";

export const loadEntriesForJob = (jobId) => {
  const path = `${SERVER}`;
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

export const selectOtherMarkers = (entries, currentEntryId) => {
  entries.filter(entry => {
    if(entry.hasOwnProperty('currentUpload')) {
      return entry.id !== currentEntryId;
    }
  })
};

// handleFileUpload(e) {
//   this.setState({uploadLoading: true});
//   e.preventDefault();
//   const file = e.target.files[0];
//   const formData = new FormData();
//   formData.append("image", file);
//   uploadFile(formData)
//     .then(publicUrl => {
//       if(publicUrl.status === 200) {
//         const uploadItem = {"name": file.name, "url": publicUrl.data};
//         const updatedSelectedUploads = [...this.state.currentEntry.selectedUploads, uploadItem];
//         const updatedJobStatus = {
//           ...this.state.currentEntry,
//           selectedUploads: updatedSelectedUploads
//         };
//         this.setState({
//           uploadLoading: false,
//           currentEntry: updatedJobStatus
//         })
//       } else {
//         console.log("error uploading image");
//       }
//     });
// }
