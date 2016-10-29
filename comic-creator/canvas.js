$.jCanvas.defaults.fromCenter = false; // Sets default draw start point to be from upper left corner
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">

// -------- CANVAS SETUP --------

// Add delete button
$comicCanvas.addLayer({
  type: 'image',
  source: 'img/buttons/delete-button.png',
  groups: ['ui-buttons'],
  x: 717, y: 10,
  draggable: false,
  opacity: 0,
  click: function() {
    deleteSelectedLayers();
  }
});

// Add text button
$comicCanvas.addLayer({
  type: 'image',
  source: 'img/buttons/text-button.png',
  groups: ['ui-buttons'],
  x: 717, y: 60,
  opacity: 0,
  click: function() {
    addTextLayer();
  }
});

// Add bring-to-front button
$comicCanvas.addLayer({
  type: 'image',
  source: 'img/buttons/bring-to-front-button.png',
  groups: ['ui-buttons'],
  x: 717, y: 110,
  opacity: 0,
  click: function() {
    bringSelectedLayersToFront();
  }
});

$comicCanvas.drawLayers();


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