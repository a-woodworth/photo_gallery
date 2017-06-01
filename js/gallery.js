// Variables for overlay
var $overlay = $('<div id="overlay"></div>');
var $modal = $('<div id="modal"></div>');
var $close_btn =
  $("<button id='close'><i class='fa fa-times' aria-hidden='true'></i></i></button>");
  var $arrowLeft =
  $('<button class="previous"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>');
var $arrowRight =
  $('<button class="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>');
var $img = $('<img>');
var $caption = $('<p></p>');
var imageLocation;
var currentImage;
var captionText;


//=============== Search Function ===============

// Add search capability
$(function() {
  $('#gallery img').each(function() {
    $(this).prop('alt').toLowerCase();
  });
});

$('#search').on('keyup', function() {
  var query = $(this).val().toLowerCase();
    $('#gallery img').each(function(){
      //console.log(query);
      if ( $(this).prop('alt').toLowerCase().indexOf(query) >= 0 ||
          query.length < 1 ) {
        $(this).parent().parent().show();
      } else {
        $(this).parent().parent().hide();
      }
    });
});


//=============== Create Gallery ===============

// Create list to display all photo thumbnails
var photoDisplay =
  document.createElement('ul');
  photoDisplay.id = 'photo_list';

for (var i = 0; i < photos.length; i++) {
  var photoList = document.createElement('li');
  photoList.className = 'photo_list_item';

// Add thumbnail images with caption for alt description
  var photoThumb = document.createElement('img');
  photoThumb.className = 'photo_thumbnail';
  photoThumb.src = 'Photos/Thumbnails/' + photos[i].thumbnail;
  photoThumb.alt =  photos[i].caption;
  //console.log(photoThumb);

  var photoLink = document.createElement('a');
  photoLink.setAttribute('href', 'Photos/' + photos[i].image);
  //console.log(photoLink);

// Build photo gallery
  photoLink.appendChild(photoThumb);
  photoList.appendChild(photoLink);
  photoDisplay.appendChild(photoList);
}
// Add list to existing gallery div
document.querySelector('#gallery').appendChild(photoDisplay);


//=============== Overlay/Lightbox ===============

// Add overlay
$('body').append($overlay);

// Add image and caption to overlay
$overlay.append($modal);
$modal.append($img);
$modal.append($caption);

// Add close button to overlay
$modal.append($close_btn);

// Add arrows to overlay
$modal.append($arrowLeft);
$modal.append($arrowRight);


// Click the thumbnail and display full-size image
$('#photo_list a').click(function(event) {
  event.preventDefault();
  imageLocation = $(this).attr('href');

  // Add class to image shown on overlay
  currentImage = $(this);
  currentImage.addClass('selected');

  // Add caption
  captionText = $(this).children('img').attr('alt');

  // Update overlay with the image linked in the link
  $img.attr('src', imageLocation).fadeIn('slow');
  $caption.text(captionText);

  // Show the overlay
  $overlay.show();

  var display = $(window).scrollTop();
    $(window).scroll(function() {
    $(window).scrollTop(display);
  });
});

// Remove overlay
$close_btn.click(function() {
  $('#overlay').hide();
  $(window).off('scroll');
});

//  Activate arrows to cycle through images
$arrowRight.on('click', function() {
  $(currentImage).removeClass('selected');
  nextImage = $(currentImage).parent().next();
  nextImage.addClass('selected');
  imageLocation = $(nextImage).find('a').attr('href');
  captionText = $(nextImage).find('a').attr('alt');
  $img.attr('src', imageLocation).fadeIn('slow');
  $caption.text(captionText);
});

$arrowLeft.on('click', function() {
  $(currentImage).removeClass('selected');
  prevImage = $(currentImage).parent().prev();
  prevImage.addClass('selected');
  imageLocation = $(prevImage).find('a').attr('href');
  captionText = $(prevImage).find('a').attr('alt');
  $img.attr('src', imageLocation).fadeIn('slow');
  $caption.text(captionText);
});

function selectedImage(currentImage) {

}
