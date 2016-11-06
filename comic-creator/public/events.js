$comicCanvas.on('mouseover', function(e) {
  $(this).setLayerGroup('ui-buttons', {
    visible: true
  }).drawLayers();
});

$comicCanvas.on('mouseleave', function(e) {
  $(this).setLayerGroup('ui-buttons', {
    visible: false
  }).drawLayers();
});

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
  addImageLayer(src, x, y);
});

$('#images').on('click', 'img', function() {
  if(hasBackground){
    var x = ($comicCanvas.getLayers().length - 1) * 100;
  }else{ 
    //TODO: Change this line to bound the x, y and keep the image on screen by default
    var x = $comicCanvas.getLayers().length * 100; 
  }
  addImageLayer(this.src, 0, 0);
});

$('#delete-button').on('click', function(e) {
  deleteSelectedLayers();
});

$('#add-text').on('click', function(e) {
  if ($('textarea').val() == "") {return};
  var text = $('textarea').val();
  addTextLayer(text, 0, 0);
});

$('#image-type').on('change', function() {
  var type = $(this).val();
  loadImagesOfType(type);
});