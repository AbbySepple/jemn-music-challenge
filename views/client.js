$(document).ready( function (){
  console.log('SOURCE JQ');
    getAlbums();
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
getAlbums();
};//end of sendAlbum

var getAlbums = function(){
  $.ajax({
    type: 'GET',
    url: '/album',
    success: function(response) {
      console.log('back from get albums with: ', response);
      var outputDiv = $('#outputDiv');
      outputDiv.empty();

      for (var i = 0; i < response.length; i++) {
        var cellText = '<div class="col-sm-3 music"><img src=" '+ response[i].albumImg +' " style="width:100%"/>';
        cellText+= "<p>" + response[i].albumName +"</p>";
        cellText+= "<p>" + response[i].albumArtist +"</p>";
        cellText+= "<p>" + response[i].albumYear +"</p>";

        outputDiv.append(cellText);
      }//end for var
    }//end success
  });//end of ajax
};//end getAlbums function
