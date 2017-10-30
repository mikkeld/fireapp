const express = require("express"), bodyParser = require("body-parser"), sentiment = require("sentiment"), cors = require("cors");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let port = 8000;
let router = express.Router();

let Multer = require('multer');
let multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

app.post('/test', multer.single('image'), function (req, res, next) {
    const storage = require('@google-cloud/storage');
    const gcs = storage({
        projectId: 'friendlychat-61656',
        keyFilename: '/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json'
    });
    let bucket = gcs.bucket('friendlychat-61656.appspot.com');

    bucket.upload(req.file.path).then(data => {
        file = data[0];
        console.log(file);
        //
        // bucket.file('hiking-image.jpg').getSignedUrl({
        //     action: 'read',
        //     expires: '03-17-2025'
        // }, function (err, url) {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //
        //     console.log(url)
        // });
    });
});

app.listen(port, () => {
    console.log('listening on', port);
});

