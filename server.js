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

//route
app.get('/', function (req, res){
  console.log('base url hit', path.resolve ('public/views/index.html'));
  res.sendFile(path.resolve ('public/views/index.html'));
});

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//spin up server
app.listen( port, function (){
  console.log('server is up and listening:', port);
});



app.post('/album', function(req, res){
  console.log('in post album');
  var newAlbum = album(req.body);
  newAlbum.save();
  res.send(200);
});//end of app post


app.get('/album', function(req, res){
  console.log('get to albums');
  album.find().then(function(data){
    res.send(data);
  });//end album find
});//end app.get

app.delete( '/album', function( req, res ){
 console.log( 'in delete album route' );
 album.remove( { _id: req.body.id }, function(err) {
   if ( err ) {
     res.send( 400 );
   } //end Error
   else {
     res.send( 200 );
   } // end no error
 }); //end album remove
}); //end delete album
