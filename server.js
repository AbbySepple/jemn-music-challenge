var express = require('express');
var mongoose = require('mongoose');
var path = require ('path');
var bodyParser = require('body-parser');
var app = express();


//connect to mongoose
mongoose.connect('localhost:/27017/katzRecords');

//build schema
var katzSchema = mongoose.Schema ({
  albumImg: String,
  albumName: String,
  albumArtist: String,
  albumYear: Number
});

 //create globals
var album = mongoose.model('album', katzSchema);
var port = process.env.PORT || 7778;

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//spin up server
app.listen( port, function (){
  console.log('server is up and listening:', port);
});

//route
app.get('/', function (req, res){
  console.log('base url hit');
  res.sendFile(path.resolve ('views/index.html'));
});
