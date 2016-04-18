var defaultText = 'Search';
var searchBox = document.getElementById('search');
// Default text after load
searchBox.value = defaultText;


function printPhoto(photos) {
    console.log(photos.name);
}

function list() {
    var photosLength = [];
    for (i = 0; i < photos.length; i++) {
        printPhoto(photos[i]);
    }
}
list();
