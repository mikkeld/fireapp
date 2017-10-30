const storage = require('@google-cloud/storage');
const gcs = storage({
    projectId: 'friendlychat-61656',
    keyFilename: '/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json'
});
let bucket = gcs.bucket('friendlychat-61656.appspot.com');

module.exports = bucket;