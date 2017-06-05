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
var imageCache;
var index;
var nextImage;
var prevImage;
var searchResults;


//=============== Search Function ===============

// Add search capability
$(function() {
  $('#gallery img').each(function() {
    $(this).prop('alt').toLowerCase();
  });
});

$('#search').on('keyup', function() {
  searchResults = [];
  var query = $(this).val().toLowerCase();
    $('#gallery img').each(function(){
      console.log(query);
      if ( $(this).prop('alt').toLowerCase().indexOf(query) >= 0 ||
          query.length < 1 ) {
        $(this).parent().parent().show().addClass('search_results');
        searchResults.push(this.closest('li'));
      } else {
        $(this).parent().parent().hide();
      }
    });
  return searchResults;
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

  // Add class to current image container shown on overlay
  currentImage = $(this).closest('li').addClass('active');

  // Cache all images
  imageCache = $('#gallery li') //.toArray();

  // Get index position
  index = $(imageCache).filter('.active').index();

  // Find current image path
  imageLocation = $(this).attr('href');

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

// Go to next overlay image
$arrowRight.click(function() {
  $(currentImage).removeClass('active');

  // If last image, go to first image
  if (index === (imageCache.length - 1)) {
    nextImage = $(imageCache[0]).closest('li').find('img').trigger('click');
    index = 0;
  }
  else {
    index = index + 1;
    nextImage = $(imageCache[index]).find('img').trigger('click');
  }
  currentImage = $(imageCache).filter('.active');
});

// Go to previous overlay image
$arrowLeft.on('click', function() {
  $(currentImage).removeClass('active');

  // If first image, go to last image
  if (index === 0) {
    prevImage = $(imageCache[imageCache.length - 1]).find('img').trigger('click');
    index = imageCache.length - 1;
  }
  else {
    index = index - 1;
    prevImage = $(imageCache[index]).closest('li').find('img').trigger('click');
  }
});
