var defaultText = 'Search';
var searchBox = document.getElementById('search');
// Default text after load
searchBox.value = defaultText;


var photoDisplay =
  document.createElement('div');
  photoDisplay.className = 'main_gallery';

for (var i =0; i < photos.length; i++) {
  var photoThumb = document.createElement('img');
  console.log(photoThumb);
  photoThumb.src = photos[i].thumbnail;
  photoDisplay.appendChild(photoThumb);
}
document.body.appendChild(photoDisplay);
