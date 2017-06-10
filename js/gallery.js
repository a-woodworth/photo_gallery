// Variables for overlay
var $overlay = $('<div id="overlay"></div>');
var $modal = $('<div id="modal"></div>');
var $close_btn =
  $("<button id='close'><i class='fa fa-times' aria-hidden='true'></i></i></button>");
  var $arrowLeft =
  $('<button class="previous"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>');
var $arrowRight =
  $('<button id="nxt" class="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>');
var $img = $('<img>');
var $caption = $('<p></p>');
var $video = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/N-YuSKeFMxY?&autoplay=1" frameborder="0" allowfullscreen></iframe>');
var imageLocation;
var currentImage;
var captionText;
var imageCache;
var index;
var nextImage;
var prevImage;
var searchResults;

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

  var photoLink = document.createElement('a');
  photoLink.setAttribute('href', 'Photos/' + photos[i].image);

// Build photo gallery
  photoLink.appendChild(photoThumb);
  photoList.appendChild(photoLink);
  photoDisplay.appendChild(photoList);
}

// Add list to existing gallery div
document.querySelector('#gallery').appendChild(photoDisplay);

// Add button for video
var videoBtn = document.createElement('button');
videoBtn.id = 'video_button';
videoBtn.className = 'animate';

// Add music note icon in span
var videoBtnIcon = document.createElement('i');
videoBtnIcon.className = 'fa fa-music';
videoBtnIcon.setAttribute('aria-hidden', 'true');

var videoIconSpan = document.createElement('span');
videoIconSpan.appendChild(videoBtnIcon);
videoIconSpan.className = 'musicnotes';

// Add button text
var videoBtnText = document.createTextNode('Too relaxed? Wake up!');
videoIconSpan.appendChild(videoBtnText);
videoBtn.appendChild(videoBtnText);
videoBtn.appendChild(videoIconSpan);

document.querySelector('#gallery').appendChild(videoBtn);


//=============== Images Lightbox ===============

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
  imageCache = $('#gallery li');

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

  // Set scroll position
  var display = $(window).scrollTop();
    $(window).scroll(function() {
    $(window).scrollTop(display);
  });
});


//=============== Video Lightbox ===============

// Activate video from button click
$('#video_button').on('click', function() {

  // Add overlay
  $('body').append($overlay);

  // Hide elements not needed on video overlay
  $img.hide();
  $caption.hide();
  $arrowRight.hide();
  $arrowLeft.hide();

  // Add wrapper to iframe to make video responsive
  $overlay.append($modal);
  var wrapper = $('<div class="video_wrapper"></div>');
  $modal.append(wrapper);
  wrapper.append($video).addClass('video_wrapper');

  // Bring close button up so it sits on new wrapper div
  wrapper.append($close_btn);

  // Show the overlay
  $overlay.show();

  // Stop video if close button clicked before video has finished
  $close_btn.click(function() {
    $('.video_wrapper').remove();
    closeSelectedImage();

    // Turn other overlay elements back on
    $img.show();
    $caption.show();
    $arrowRight.show();
    $arrowLeft.show();
  });
  // Return close button to modal
  $modal.append($close_btn);
});


//============ Overlay/Lightbox Buttons =============

// Go to next overlay image
$arrowRight.click(function() {
  nextSelectedImage();
});

// Go to previous overlay image
$arrowLeft.click(function() {
  prevSelectedImage();
});

// Go to previous and next images via arrow keys. Use esc to close overlay.
$(document).keydown(function(e) {
  switch(e.which) {
      case 37: // prev with left arrow
      prevSelectedImage();
      break;

      case 39: // next with right arrow
      nextSelectedImage();
      break;

      case 27: // close with esc
      closeSelectedImage();
      break;

      default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action
});

// Remove overlay
$close_btn.click(function() {
  closeSelectedImage();
});


//=============== Functions ===============

// Get next image
function nextSelectedImage() {
  imageCache = $(imageCache);
  currentImage = $(currentImage).removeClass('active');

  // If last image, go to first image
  if (index === (imageCache.length - 1)) {
    nextImage = $(imageCache[0]).closest('li').find('img').trigger('click');
    index = 0;
  }
  else {
    index = index + 1;
    nextImage = $(imageCache[index]).find('img').trigger('click');
  }
}

// Get previous image
function prevSelectedImage() {
  imageCache = $(imageCache);
  currentImage = $(currentImage).removeClass('active');

  // If first image, go to last image
  if (index === 0) {
    prevImage = $(imageCache[imageCache.length - 1]).find('img').trigger('click');
    index = imageCache.length - 1;
  }
  else {
    index = index - 1;
    prevImage = $(imageCache[index]).closest('li').find('img').trigger('click');
  }
}

// Close overlay
function closeSelectedImage() {
  $('#overlay').hide();
  $(window).off('scroll');
}


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
        $(this).parent().parent().hide().removeClass('search_results');
      }
    });
  return searchResults;
});
