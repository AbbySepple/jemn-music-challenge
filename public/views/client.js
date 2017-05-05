$(document).ready( function (){
  console.log('SOURCE JQ');
  getAlbums();
  $('#addAlbum').on('click', sendAlbum);
  $( '#outputDiv').on( 'click', '.del', deleteAlbum);
});

var sendAlbum = function(){
  var albumToSend = {
    albumImg: $('#albumImg').val(),
    albumName: $('#albumName').val(),
    albumArtist: $('#albumArtist').val(),
    albumYear: $('#albumYear').val()
  }; //end of var albumToSend
  console.log('sending: ', albumToSend);

  $.ajax({
    type: 'POST',
    url: '/album',
    data: albumToSend,
    success: function(response) {
      console.log('back with: ', response);
    }//end success
  });//end ajax
  getAlbums();
};//end of sendAlbum

function getAlbums(){
  console.log('in get albums');
  $.ajax({
    type: 'GET',
    url: '/album',
    success: function(response) {
      console.log('back from get albums with: ', response);
      var outputDiv = $('#outputDiv');
      outputDiv.empty();

      for (var i = 0; i < response.length; i++) {
        var cellText = '<div class="col-sm-3 card"><img src=" '+ response[i].albumImg +'" width=100% class="pic"/>';
        cellText+= "<p>" + response[i].albumName +"</p>";
        cellText+= "<p>" + response[i].albumArtist +"</p>";
        cellText+= "<p>" + response[i].albumYear +"</p>";
        cellText += '<button class ="del btn-secondary" data-id="'+response[i]._id +'">Delete </button></div>';
        // <button class="removeButton btn btn-secondary" data-id="' + albums[i]._id + '">Remove</button></div>

        outputDiv.append(cellText);
      }//end for var
    }//end success
  });//end of ajax
}//end getAlbums function

function deleteAlbum(){
  console.log('in delete album');
   var myId = $( this ).data( 'id' );
   console.log( 'removing:', myId );
   var objectToSend = {
     id: myId
   }; //end objectToSend
   $.ajax({
     url: '/album',
     type: 'DELETE',
     data: objectToSend,
     success: function( response ){
       console.log( 'back from server with:', response );
       getAlbums();
     } //end success
   }); //end ajax
 } //end document on click removeButton
