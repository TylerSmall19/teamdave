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
  opacity: .9,
  click: function() {
    deleteSelectedLayers();
  }
}).drawLayers();


// -------- HELPER FUNCTIONS --------

function deleteSelectedLayers() {
  //Removes all layers from canvas in the 'selected' group and redraws layers
  $comicCanvas.removeLayerGroup('selected')
  // Redraws layers (required on layer remove, option most other places. Test necessity before altering)
  .drawLayers();
}

console.log($comicCanvas);
console.log('script loaded');