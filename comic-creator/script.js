$.jCanvas.defaults.fromCenter = false;
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;
var selectedIndex;

// EVENT HANDLERS
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

$comicCanvas.on('click', function(e) {
	deSelectLayers();
});

$('#delete-button').on('click', function(e) {
	deleteSelectedLayer();
});

// HELPER FUNCTIONS

function addLayer(src, x, y) {
	var index, isBackground;
	if (src.includes('backgrounds')) {
		isBackground = true;
		// Backgrounds are centered in canvas...
		x = 0;
		y = 0;
		// And replace the previous background if already drawn
		if (hasBackground) {
			$comicCanvas.removeLayer(0);
			index = 0; 
		}
		hasBackground = true;
	} else {
		isBackground = false;
		index = 1 + $comicCanvas.getLayers().length;
	};

	$comicCanvas.addLayer({
		type: 'image',
		source: src,
		x: x, y: y,
		draggable: false,
		index: index,
		sel: true,
		isBackground: isBackground,
		// When sedlected, move to .6 opaque
		click: function(layer){
			selectLayer(layer);
		}
	});

	// Get layer we just added and select it
	var length = $comicCanvas.getLayers().length;
	var layer = $comicCanvas.getLayers()[length - 1];
	selectLayer(layer);	

	$comicCanvas.drawLayers();
};

function selectLayer(layer) {
	// Backgrounds aren't selectable
	if (layer.isBackground) {return};
	deSelectLayers();
	layer.sel = true;
	$comicCanvas.setLayer(layer, { draggable: true });
	layer.opacity = 0.6;
	selectedIndex = layer.index;
	$comicCanvas.drawLayers();
}

function deSelectLayers() {
	var layers = $comicCanvas.getLayers();
	for (var i=0; i < layers.length; i++) {
		var layer = layers[i];
		layer.sel = false;
		layer.draggable = false;
		layer.opacity = 1;
		selectedIndex = null;
		$comicCanvas.drawLayers();
	}
}

function deleteSelectedLayer() {
	var layer = $comicCanvas.getLayer(selectedIndex);
	console.log(layer);
	$comicCanvas.removeLayer(layer)
	.drawLayers();
}

