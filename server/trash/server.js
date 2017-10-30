const express = require("express"), bodyParser = require("body-parser"), sentiment = require("sentiment"), cors = require("cors"), multer = require("multer"), fileClient = ("file-uploader");
let app = express();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname +".jpg" )
    }
})

var upload = multer({ storage: storage })


// let upload = multer({dest: 'uploads/', });
const vision = require('./../vision.js');
const photos = require('./photos');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let port = 8000;
let router = express.Router();



app.post('/test', upload.single('image'), function (req, res, next) {
	console.log("Hit upload");
    // req.file is the `avatar` file
    // req.file.cloudStorageObject = req.file.originalname
    const storage = require('@google-cloud/storage');
    const fs = require('fs');
    const gcs = storage({
        projectId: 'friendlychat-61656',
        keyFilename: '/Users/mikkeld/Inbox/config/FriendlyChat-57fed230a76a.json'
    });
    let bucket = gcs.bucket('friendlychat-61656.appspot.com');

    bucket.upload(req.file.path, function(err, file) {
        if (err) {
            throw new Error(err);
        }
        console.log(file);
    });

	console.log(req.file);

    // req.body will hold the text fields, if there were any
})

router.route('/annotate')
	.post((req,res) => {
		console.log("Called post");



		//req = object with the data that you want to process
		console.log(req.file);


		res.json({status: 200});





		// console.log("working");
		// let Photos = new photos();
		// console.log("photo:", req.body);

		// console.log(req.files);
		// Photos.saveImage(photo);
		// let Vision = new vision();
		// let image = req.body;
		// Vision.getLabelsForImage(image)
		// 	.then((annotations, error) => {
		// 		if(error) throw new Error(error);
		// 		console.log(annotations);
		// 	})
	});


// router.use((req, res, next) => {
// 	console.log("Something to happen");
// 	next();
// });
//
// router.get('/', (req, res) => {
// 	console.log("get");
// });
//
// router.route('/emails')
// 	.post((req, res) => {
// 		// let s1 = sentiment(req.body.text);
// 		// let email = new Email();
// 		// console.log(email);
// 		let email = new Email();
// 		let content = req.body;
// 		email.composeEmail(content)
// 			.then((result, error) => {
// 				if(error) throw new Error(error);
// 				res.json(result);
// 			})
// 	})
//
// 	.get((req, res) => {
// 		Email.getEmails()
// 			.then(res => {
// 				console.log(res);
// 			})
// 	});

// let getSentiment = function(text) {
// 	return sentiment(text);
// };


// router.route('/bears')
// 	// curl -d '{"name":["pizza"]}' -H 'content-type:application/json' http://localhost:8000/api/bears
// 	.post((req, res) => {
// 		let bear = new Bear(req.body.name);
// 		mongo.connect(url, (err, db) => {
// 			if(err) throw err;
// 			let bears = db.collection('bears');
// 			bears.insert(bear, (err, data) => {
// 				if(err) throw err;
// 				console.log("Bear inserted");
// 				db.close();
// 			});
// 		})
//
// 	})
//
// 	// curl -X GET http://localhost:8000/api/bears
// 	.get((req, res) => {
// 		mongo.connect(url, (err, db) => {
// 			if(err) throw err;
// 			let bears = db.collection('bears');
// 			bears.find().toArray((err, data) => {
// 				if(err) throw err;
// 				console.log(data);
// 				db.close();
// 			})
// 		})
// 	});

// curl -X GET http://localhost:8000/api/bears/Mikkel
// router.route('/bears/:name')
// 	.get((req, res) => {
// 		mongo.connect(url, (err, db) => {
// 			let bears = db.collection('bears');
// 			bears.find({
// 				name: req.params.name
// 			}).toArray((err, data) => {
// 				if(err) throw err;
// 				res.json(data)
// 			})
// 		})
// 	});

app.use('/api', router);
app.listen(port, () => {
	console.log('listening on', port);
});
