$.jCanvas.defaults.fromCenter = false; // Sets default draw start point to be from upper left corner
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">

// -------- UI BUTTON SETUP --------

function layoutUIButtons(src, x, y) {
  var imgNames = [
    'delete-button', 
    'text-button', 
    'bring-to-front'
  ];

  var y = 10;

  for (var i = 0; i < imgNames.length; i++) {
    var name = imgNames[i];
    var src = 'img/buttons/' + name + '.png';
    
    // Get image width
    var img = new Image();
    img.src = src;

    // Set x to image width + 10, away from right edge
    var x = $comicCanvas.width() - 10 - img.width;

    $comicCanvas.addLayer({
      type: 'image',
      name: name,
      source: src,
      groups: ['ui-buttons'],
      x: x, y: y,
      opacity: 0,
      draggable: false
    });

    // Increment y for next button draw
    y += (img.height + 10);
    console.log('Set up ' + name + ' button');
  }
};

// -------- CLICK HANDLERS --------

function bringSelectedLayersToFront() {
  // TODO
  console.log('Brought selected layers to front');
}

function addTextLayer(text, x, y) {
  $comicCanvas.drawText({
    layer: true,
    draggable: false,
    fillStyle: '#9cf',
    strokeStyle: '#25a',
    strokeWidth: 2,
    x: x, y: y,
    fontSize: 48,
    fontFamily: 'Verdana, sans-serif',
    text: text,
    click: function(layer) {
      selectLayer(layer);
    }
  });
};

function deleteSelectedLayers() {
  //Removes all layers from canvas in the 'selected' group and redraws layers
  $comicCanvas.removeLayerGroup('selected')
  // Redraws layers (required on layer remove, option most other places. Test necessity before altering)
  .drawLayers();
  console.log('Deleted selected layers');
}

// -------- RUN SCRIPT --------

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
    bringSelectedLayersToFront();
  }
});

$comicCanvas.drawLayers();