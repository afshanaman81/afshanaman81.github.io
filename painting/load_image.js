
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var randomNumber = Math.floor((Math.random() * 10) + 1);
var sources = {
	src: "img/" + randomNumber + ".png"
};

loadImages(sources, function(images) {
	var image = images.src
	context.drawImage(image,canvas.width / 2 - image.width / 2,
		canvas.height / 2 - image.height / 2);
});

function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	// get num of sources
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}