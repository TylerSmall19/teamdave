$.jCanvas.defaults.fromCenter = false; // Sets default draw start point to be from upper left corner
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">

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