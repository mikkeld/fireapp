let express = require('express');
let router = express.Router();

let routes = function(imageUploader) {
    router.post('/upload',
        imageUploader.getMulter().single('image'),
        (req, res) => {
            imageUploader.uploadFilePromise(req.file.path)
                .then(filename => imageUploader.getExternalUrl(filename))
                .then(publicUrl => {
                    res.send(publicUrl);
                })
                .catch(error => console.log(error));
    });

    return router;
};

module.exports = routes;