
$comicCanvas.addLayer({
  type: 'image',
  name: 'bgdefault',
  source: 'img/bgdefault.png',
  x: 0, y: 0,
  draggable: false,
  click: function() {
    deSelectLayers();
  }
}).drawLayers();

layoutUIButtons();
  
// Add click handlers
$comicCanvas.setLayer('delete-button', {
  click: function(layer) {
    deleteSelectedLayers();
  }
});

$comicCanvas.setLayer('text-button', {
  click: function(layer) {
    addTextLayer('hello world', 0, 0);
  }
});

$comicCanvas.setLayer('bring-to-front', {
  click: function(layer) {
    bringLayerGroupToFront('selected');
    // UI Buttons should always be on top
    bringLayerGroupToFront('ui-buttons');
  }
});

$comicCanvas.drawLayers();