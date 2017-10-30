const express = require("express"), bodyParser = require("body-parser"), sentiment = require("sentiment"), cors = require("cors");
let app = express();

app.use(cors());

let router = express.Router();

let Multer = require('multer');
let multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

function sendUploadToGCS (req, res, next) {
    if (!req.file) {
        return next();
    }

    const storage = require('@google-cloud/storage');
    const gcs = storage({
        projectId: 'friendlychat-61656',
        keyFilename: '/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json'
    });
    let bucket = gcs.bucket('friendlychat-61656.appspot.com');

    let gcsname = Date.now() + req.file.originalname;
    let file = bucket.file(gcsname);

    let stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', function (err) {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', function () {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    stream.end(req.file.buffer);
}

function getPublicUrl (filename) {
    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
}

router.post(
    '/add',
    multer.single('image'),
    sendUploadToGCS,
    function insert (req, res, next) {
        let data = req.body;

        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        console.log(data)
        if (req.file && req.file.cloudStoragePublicUrl) {
            data.imageUrl = req.file.cloudStoragePublicUrl;
            console.log(data.imageUrl);
        }

        // Save the data to the database.
        getModel().create(data, function (err, savedData) {
            if (err) {
                return next(err);
            }
            res.redirect(req.baseUrl + '/' + savedData.id);
        });
    }
);
const port = 8000;
app.listen(port, () => {
    console.log('listening on', 8000);
});
