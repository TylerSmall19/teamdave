$.jCanvas.defaults.fromCenter = false;
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;
var selectedIndex;

$(document).on('dragstart', function(e) {
	var target = e.target;
	if (target.className.includes('draggable') == false) {return};
	e.dataTransfer = e.originalEvent.dataTransfer;
	e.dataTransfer.setData('text/plain', target.src);
	// e.name = "Image";
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
	addLayer(src, x, y);
});

$('#images').on('click', 'img', function() {
	if(hasBackground){
		var x = ($comicCanvas.getLayers().length - 1) * 100;
	}else{
		var x = $comicCanvas.getLayers().length * 100;
	}
	addLayer(this.src, x, 0);
});

function addLayer(src, x, y) {
	var index, draggable, isBackground;
	if (src.includes('backgrounds')) {
		isBackground = true;
		// Backgrounds are centered in canvas...
		x = 0;
		y = 0;
		// Undraggable...
		draggable = false;
		// And replace the previous background if already drawn
		if (hasBackground) {
			$comicCanvas.removeLayer(0);
			index = 0; 
		}
		hasBackground = true;
	} else {
		isBackground = false;
		draggable = true
		index = 1 + $comicCanvas.getLayers().length;
	};

	$comicCanvas.addLayer({
		type: 'image',
		source: src,
		x: x, y: y,
		draggable: draggable,
		index: index,
		sel: true,
		isBackground: isBackground,
		// When sedlected, move to .6 opaque
		dblclick: function(layer){
			selectLayer(layer);
		}
	});

	// Get layer we just added and select it
	var length = $comicCanvas.getLayers().length;
	var layer = $comicCanvas.getLayers()[length - 1];

	// If it's a background, it's not automatically selected
	if (layer.isBackground == false) { selectLayer(layer); };
	
	$comicCanvas.drawLayers();
};

function selectLayer(layer) {
	var layers = $comicCanvas.getLayers();
	for (var i=0; i<layers.length; i++) {
		var l = layers[i];
		l.sel = false;
		l.opacity = 1;
	}
	layer.sel = true;
	layer.opacity = 0.6;
	selectedIndex = layer.index;
	console.log(selectedIndex);
}



