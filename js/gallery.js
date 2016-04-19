// Add search capability -- still needs work
var defaultText = 'Search';
var searchBox = document.getElementById('search');
// Default text after load
searchBox.value = defaultText;

// Create list to display all photo thumbnails
var photoDisplay =
  document.createElement('ul');
  photoDisplay.className = 'photo_list';

for (var i = 0; i < photos.length; i++) {
  var photoList = document.createElement('li');
  photoList.className = 'photo_list_item';

// Add thumbnail images with name and caption for alt description
  var photoThumb = document.createElement('img');
  photoThumb.src = 'Photos/Thumbnails/' + photos[i].thumbnail;
  photoThumb.alt =  'Photo name: ' + photos[i].name +
                    '. Photo description: ' + photos[i].caption;
  console.log(photoThumb);
  photoList.appendChild(photoThumb);
  photoDisplay.appendChild(photoList);
}
// Add list to existing gallery div
document.querySelector('.gallery').appendChild(photoDisplay);
