const express = require("express"), bodyParser = require("body-parser"), cors = require("cors");
let app = express();
let routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let imageUploader = require("./image-upload");

app.use('/', routes(new imageUploader()));

const port = 8000;

app.listen(port, () => {
    console.log('listening on', port);
});
