const firebase = require('./../vendors/firebase'), vision = require('./../vision');
let photo = require('./../models/photo');

class Photos {
    constructor() {
        this.db = firebase.database();
        this.ref = this.db.ref('photos/Imf4nFal01MofFYqOe9I8LcfhX22');
        this.vision = new vision();
    }

    saveImage(image) {
        try {
            let file = req.body.target.files[0];
        }
        catch(err) {
            throw new Error(err);
        }

        if(!file.type.match('image.*')) {
            throw new Error("You can only upload images");
        }

        this.vision.getLabelsForImage(file)
            .then((annotations, error) => {
                if(error) throw new Error(error);
                console.log(annotations);
            })


    }

    // private uploadImageFile(image) {
    //     let storageRef = firebase.storage().ref();
    // }


}

module.exports = Photos;
