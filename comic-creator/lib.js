$.jCanvas.defaults.fromCenter = false; // Sets default draw start point to be from upper left corner
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;

function addImageLayer(src, x, y) {
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

  // UI Buttons should always be in front
  bringLayerGroupToFront('ui-buttons');
  $comicCanvas.drawLayers();
};

function selectLayer(layer) {
  // Backgrounds aren't selectable by default
  if (layer.isBackground) {return};
  // When selected, opacity is set to .6 and layer is draggable
  layer.opacity = 0.6;
  $comicCanvas.setLayer(layer, { draggable: true })
  // Uses built in JCanvas functionality to track the selected images
  .addLayerToGroup(layer, 'selected')
  .drawLayers();
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
  $comicCanvas.drawLayers();
}

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
  }
};

function bringLayerGroupToFront(layerGroup) {
  var group = $comicCanvas.getLayerGroup(layerGroup);
  if (group) {
    var lastIndex = $comicCanvas.getLayers().length - 1;
    for (var i = 0; i < group.length; i++) {
      var layer = group[i];
      $comicCanvas.moveLayer(layer, lastIndex);
    };
    $comicCanvas.drawLayers();
  }
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
    fontFamily: 'comic-sans, sans-serif',
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
}