$.jCanvas.defaults.fromCenter = false; // Sets default draw start point to be from upper left corner
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">

$(document).ready(function() {
  layoutUIButtons();
});

// -------- CANVAS SETUP --------

function layoutUIButtons(src, x, y) {
  var sources = [
    'delete-button.png', 
    'text-button.png', 
    'bring-to-front-button.png'
  ];

  var y = 10;

  for (var i = 0; i < sources.length; i++) {
    var src = 'img/buttons/' + sources[i];
    
    // Get image width
    var img = new Image();
    img.src = src;

    // Set x to image width + 10
    var x = $comicCanvas.width() - 10 - img.width;

    $comicCanvas.addLayer({
      type: 'image',
      source: src,
      groups: ['ui-buttons'],
      x: x, y: y,
      opacity: 0,
      draggable: false
    });

    y += (img.height + 10);
  }

  $comicCanvas.drawLayers();
};

// -------- HELPER FUNCTIONS --------

function bringSelectedLayersToFront() {
  // TODO
  console.log('Brought selected layers to front');
}

function addTextLayer(text) {
  // TODO
  console.log('Added text layer');
}

function deleteSelectedLayers() {
  //Removes all layers from canvas in the 'selected' group and redraws layers
  $comicCanvas.removeLayerGroup('selected')
  // Redraws layers (required on layer remove, option most other places. Test necessity before altering)
  .drawLayers();
}