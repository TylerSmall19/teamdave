$.jCanvas.defaults.fromCenter = false; // Sets default draw start point to be from upper left corner
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;

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

$(document).on('keyup', function(e) {
	// On delete key press, delete all selected layers
	if(e.which == 46){
		deleteSelectedLayers();
	}
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
		//TODO: Change this line to bound the x, y and keep the image on screen by default
		var x = $comicCanvas.getLayers().length * 100; 
	}
	addLayer(this.src, x, 0);
});

// Discuss the necessity of this event before removing.
// $comicCanvas.on('click', function(e) {
// 	deSelectLayers();
// });

$('#delete-button').on('click', function(e) {
	deleteSelectedLayers();
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
		isBackground: isBackground,
		// Adds created layer to selected group when new layer is added if the layer isn't a background
		add: function(layer){
			if(!isBackground){
				selectLayer(layer);
			}
		},
		click: function(layer){
			// Deselect all when background image is clicked
			if(isBackground){
				deSelectLayers();
			// Otherwise, select clicked layer
			}else{
				selectLayer(layer);
			}
		}
	});

	$comicCanvas.drawLayers();
};

function selectLayer(layer) {
	// Backgrounds aren't selectable by default
	if (layer.isBackground) {return};
	// When selected, opacity is set to .6 and layer is draggable
	layer.opacity = 0.6;
	$comicCanvas.setLayer(layer, { draggable: true })
	// Uses built in JCanvas functionality to track the selected images
	.addLayerToGroup(layer, 'selected');
}

function deSelectLayers() {
	//Creates and array of all layers on the canvas
	var layers = $comicCanvas.getLayers();
	//Sets all the layer group to opacity 1 and draggable false
	$comicCanvas.setLayerGroup('selected', {
		opacity: 1,
		draggable: false
	})
	//Remove all layers in the 'selected' group and redraw
	for (var i=0; i < layers.length; i++) {
		var layer = layers[i];
		$comicCanvas.removeLayerFromGroup(layer, 'selected');
	}
}

function deleteSelectedLayers() {
	//Removes all layers from canvas in the 'selected' group and redraws layers
	$comicCanvas.removeLayerGroup('selected')
	// Redraws layers (required on layer remove, option most other places. Test necessity before altering)
	.drawLayers();
}