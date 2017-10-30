const vision = require('@google-cloud/vision');

const visionClient = vision({
    projectId: 'friendlychat-61656',
    keyFilename: '/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json'
});

class Vision {
    constructor() { }

    getLabelsForImage(imagePath) {
        return new Promise((resolve, reject) => {
            visionClient.detectLabels(imagePath, (error, annotations) => {
                if(error) reject(error);
                resolve(annotations);
            })
        })
    }

}

module.exports = Vision;

