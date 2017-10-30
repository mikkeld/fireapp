const firebase = require('./../vendors/firebase');
const gcloud = require('google-cloud');
const PROJECT_ID = 'friendlychat-61656';
const KEYPATH ='/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json';

let storage = gcloud.storage({
    projectId: PROJECT_ID,
    keyFilename: KEYPATH
});
let bucket = storage.bucket(`${PROJECT_ID}.appspot.com`);

class FileUpload {
    constructor() {
        this.storage = gcloud.storage({
            projectId: PROJECT_ID,
            keyFilename: KEYPATH
        });
        this.bucket = storage.bucket(`${PROJECT_ID}.appspot.com`);
    }

    static getPublicUrl(filename) {
        return `https://firebasestorage.googleapis.com/v0/b/${PROJECT_ID}.appspot.com/${filename}`;
    }

    static getStorageUri(filename) {
        return `gs://${PROJECT_ID}.appspot.com/${filename}`;
    }

    public uploadToStorage(req, res, next) {
        if (!req.file) {
            next();
        }

        let fbName = Date.now() + req.file.originalName;
        let file = bucket.file(fbName);
        let stream = file.createWriteStream();

        stream.on('error', err => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on('finish', () => {
            req.file.cloudStorageObject = fbName;
            req.file.cloudStoragePublicUrl = this.getPublicUrl(fbName);
            req.file.cloudStorageUri = this.getStorageUri(fbName);
            next();
        });

        stream.end(req.file.buffer);
    }

     multer = require('multer')({
         inMemory: true,
         fileSize: 5 * 1024 * 1024,
         rename: function (fieldname, filename) => {
             return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
         }
     });

}

// module.exports = FileUpload;
//
//
//
// let bucket = storage.bucket(`${PROJECT_ID}.appspot.com`);
// bucket.upload("img1.jpg", (err, file) => {
//     if (err) throw new Error(err);
//     let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${PROJECT_ID}.appspot.com/o/${file.metadata.name}?alt=media`;
//     console.log(publicUrl);
// });

// class ImageUploader {
//     constructor() {
//         this.storage = firebase.storage();
//     }
//
//     public uploadToStorage(req, res, next) {
//         if(!req.file) {
//             next();
//         }
//
//         let fbName = Date.now() + req.file.originalName;
//
//
//     }
//
// }