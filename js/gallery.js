// Add search capability -- still needs work
// var defaultText = 'Search';
var searchBox = document.getElementById('search');
// Default text after load
// searchBox.value = defaultText;

// Create list to display all photo thumbnails
var photoDisplay =
  document.createElement('ul');
  photoDisplay.className = 'photo_list';

for (var i = 0; i < photos.length; i++) {
  var photoList = document.createElement('li');
  photoList.className = 'photo_list_item';

// Add thumbnail images with name and caption for alt description
  var photoThumb = document.createElement('img');
  photoThumb.className = 'photo_thumbnail';
  photoThumb.src = 'Photos/Thumbnails/' + photos[i].thumbnail;
  photoThumb.alt =  'Photo name: ' + photos[i].name +
                    '. Photo description: ' + photos[i].caption;
  //console.log(photoThumb);

// Add link to get fullsize image for lightbox display
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
