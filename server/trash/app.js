const express = require("express"), bodyParser = require("body-parser"), cors = require("cors"), Multer = require("multer"), Datauri = require("datauri");
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let router = express.Router();

let storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

let upload = Multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res, next) => {

    const storage = require('@google-cloud/storage');
    const gcs = storage({
        projectId: 'friendlychat-61656',
        keyFilename: '/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json'
    });
    let bucket = gcs.bucket('friendlychat-61656.appspot.com');
    bucket.upload(req.file.path, (err, file) => {
        if(!err) {
            bucket.file(file.name).getSignedUrl({
                action: 'read',
                expires: '03-17-2025'
            }, (err, url) => {
                if(!err) {
                    console.log(url);
                }
            })

        }
    })

});

const port = 8000;

app.listen(port, () => {
    console.log('listening on', port);
});
