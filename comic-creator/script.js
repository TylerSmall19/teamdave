$.jCanvas.defaults.fromCenter = false;
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;

$(document).on('dragstart', function(e) {
	var target = e.target;
	if (target.className.includes('draggable') == false) {return};
	e.dataTransfer = e.originalEvent.dataTransfer;
	e.dataTransfer.setData('text/plain', target.src);
});

$comicCanvas.on('dragover', function(e) {
	e.preventDefault();
	e.dataTransfer = e.originalEvent.dataTransfer;
	e.dataTransfer.dropEffect = 'move';
});

$comicCanvas.on('drop', function(e) {
	e.preventDefault();
	e.dataTransfer = e.originalEvent.dataTransfer;
	var data = e.dataTransfer.getData('text');
	console.log(data);
	var x = e.pageX - $comicCanvas.offset().left;
	var y = e.pageY - $comicCanvas.offset().top;
	addLayer(data, x, y);
});

function addLayer(src, x, y) {
	if (src.includes('backgrounds')) {
		x = 0;
		y = 0;
		var draggable = false;
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
