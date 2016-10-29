$.jCanvas.defaults.fromCenter = false;
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;
// var selectedIndex;

// EVENT HANDLERS
$(document).on('dragstart', function(e) {
	var target = e.target;
	if (target.className != 'draggable') {return};
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
	addLayer(src, x, y);
});

$('#images').on('click', 'img', function() {
	if(hasBackground){
		var x = ($comicCanvas.getLayers().length - 1) * 100;
	}else{
		var x = $comicCanvas.getLayers().length * 100; //TODO Change this line to bound the x, y and keep the image on screen by default
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
	console.log(src.includes('backgrounds'));
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
		// sel: true,
		isBackground: isBackground,
		// When selected, change to .6 opaque
		click: function(layer){
			selectLayer(layer);
		}
	});

	// TODO: Refactor to prevent issues with unwanted selection -- see 'Issues' in Git Hub Repo.
	// Get layer we just added and select it
	var length = $comicCanvas.getLayers().length;
	var layer = $comicCanvas.getLayers()[length - 1];
	selectLayer(layer);

	$comicCanvas.drawLayers();
};

function selectLayer(layer) {
	// Backgrounds aren't selectable
	// console.log(layer.isBackground);
	if (layer.isBackground) {return}; 
	// deSelectLayers();
	// layer.sel = true; // No longer needed. After testing, safe to remove.
	layer.opacity = 0.6;
	// selectedIndex = layer.index; // No longer needed. After testing, remove this line.
	$comicCanvas.setLayer(layer, { draggable: true })
	// Uses built in JCanvas functionality to track the selected images
	.addLayerToGroup(layer, 'selected')
	// JCanvas alows chaining for funcitons with the same canvas root (same as $comicCanvas.drawLayers() when used after above lines)
	.drawLayers();
	// console.log($comicCanvas.getLayerGroup('selected'));
}

function deSelectLayers() {
	var layers = $comicCanvas.getLayers();
	$comicCanvas.setLayerGroup('selected', {
		opacity: 1,
		draggable: false
	})
	for (var i=0; i < layers.length; i++) {
		var layer = layers[i];
		// layer.sel = false;
		// layer.draggable = false;
		// layer.opacity = 1;
		// selectedIndex = null;
		$comicCanvas.removeLayerFromGroup(layer, 'selected')
		.drawLayers();
	}
}

function deleteSelectedLayer() {
	//Removes all layers from the 'selected' group and redraws layers
	$comicCanvas.removeLayerGroup('selected')
	.drawLayers();
}

