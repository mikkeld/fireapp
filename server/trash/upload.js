const firebase = require('./../vendors/firebase');
const gcloud = require('google-cloud');
const PROJECT_ID = 'friendlychat-61656';
const KEYPATH ='/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json';

let storage = gcloud.storage({
    projectId: PROJECT_ID,
    keyFilename: KEYPATH
});
let bucket = storage.bucket(`${PROJECT_ID}.appspot.com`);

let img = 'hiking-image.jpg';

bucket.upload(img, (err, file) => {
    if (err) { return console.error(err); }
    //let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${PROJECT_ID}.appspot.com/o/${file.metadata.name}?alt=media`;
    //console.log(publicUrl);
});