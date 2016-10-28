$.jCanvas.defaults.fromCenter = false;
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;

$(document).on('dragstart', function(e) {
	var target = e.target;
	if (target.className.includes('draggable') == false) {return};
	e.dataTransfer = e.originalEvent.dataTransfer;
	e.dataTransfer.setData('text/plain', target.src);
	if (target.src.includes("backgrounds")) {return};
	var img = new Image();
	img.src = target.src;
	e.dataTransfer.setDragImage(img, img.width/2, img.height/2);
});

$comicCanvas.on('dragover', function(e) {
	e.preventDefault();
	e.dataTransfer = e.originalEvent.dataTransfer;
	e.dataTransfer.dropEffect = 'move';
});

$comicCanvas.on('drop', function(e) {
	e.preventDefault();
	e.dataTransfer = e.originalEvent.dataTransfer;
	var src = e.dataTransfer.getData('text');
	
	// Find image size
	var img = new Image();
	img.src = src;

	// Use image size to draw on canvas right where you drop it.
	var x = e.pageX - $comicCanvas.offset().left - img.width/2;
	var y = e.pageY - $comicCanvas.offset().top - img.height/2;
	addLayer(data, x, y);
});

function addLayer(src, x, y) {
	if (src.includes('backgrounds')) {
		// Backgrounds are centered in canvas...
		x = 0;
		y = 0;
		// Undraggable...
		var draggable = false;
		// And have an index of 0 if no background is already drawn
		var index = (hasBackground ? null : 0);
		hasBackground = true;
	} else {
		var draggable = true
		var index = null;
	};

	$comicCanvas.addLayer({
		type: 'image',
		source: src,
		x: x, y: y,
		draggable: true,
		index: index
	}).drawLayers();
}
