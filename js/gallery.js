// Add search capability -- working but not the greatest -- fix later
$(function() {
  var image = $('#gallery img').each(function() {
    $(this).prop('alt').toLowerCase();
  });
});

$('#search').on('keyup', function() {
  var query = $(this).val().toLowerCase();
    $('#gallery img').each(function(){
      //console.log(query);
      if ( $(this).prop('alt').indexOf(query) >= 0 || query.length < 1 ) {
        $(this).parent().parent().show();
      } else {
        $(this).parent().parent().hide();
      }
    });
});

// Create list to display all photo thumbnails
var photoDisplay =
  document.createElement('ul');
  photoDisplay.id = 'photo_list';

for (var i = 0; i < photos.length; i++) {
  var photoList = document.createElement('li');
  photoList.className = 'photo_list_item';

// Add thumbnail images with name and caption for alt description
  var photoThumb = document.createElement('img');
  photoThumb.className = 'photo_thumbnail';
  photoThumb.src = 'Photos/Thumbnails/' + photos[i].thumbnail;
  photoThumb.alt =  photos[i].caption;
  //console.log(photoThumb);

  var photoLink = document.createElement('a');
  photoLink.className = 'view_photo';
  photoLink.setAttribute('href', 'Photos/' + photos[i].image);
  //console.log(photoLink);

// Build photo gallery
  photoLink.appendChild(photoThumb);
  photoList.appendChild(photoLink);
  photoDisplay.appendChild(photoList);
}
// Add list to existing gallery div
document.querySelector('#gallery').appendChild(photoDisplay);

var $overlay = $('<div id="overlay"></div>');
var $img = $('<img>');
var $caption = $('<p></p>');

//An image and caption to overlay
$overlay.append($img);
$overlay.append($caption);

//Add overlay
$('body').append($overlay);

//Click the thumbnail and display full-size image
  $('#photo_list a').click(function(event) {
    event.preventDefault();
    var imageLocation = $(this).attr('href');
    var captionText = $(this).children('img').attr('alt');

  //Update overlay with the image linked in the link
  $img.attr('src', imageLocation);
  $caption.text(captionText);

  //Show the overlay
  $overlay.show();
  var current = $(window).scrollTop();
    $(window).scroll(function() {
    $(window).scrollTop(current);
  });
});

$('#overlay').click(function() {
  $('#overlay').hide();
  $(window).off('scroll');
});
