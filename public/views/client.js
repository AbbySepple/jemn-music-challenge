$(document).ready( function (){
  console.log('SOURCE JQ');
  $('#addAlbum').on('click', sendAlbum);
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
};//end of sendAlbum
