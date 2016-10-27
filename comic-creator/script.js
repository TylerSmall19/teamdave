$.jCanvas.defaults.fromCenter = false;
var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $sideCanvas = $('#sidebar-canvas'); // <canvas id="sidebar-canvas" width="180" height="742">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var sideCanvasArray = [];
var hasBackground = false;
var src = ['img/bg1.png', 'img/bg2.png', 'img/bg3.jpg'];


function findPos(imgNum, size, padding){
	var pos;
	pos = imgNum * size + padding;
	return pos;
}

for (x = 0; x < src.length; x++){
	var y = x;
	var name = 'bg'+x;
	$sideCanvas.addLayer({
		type: 'image',
		name: name,
		source: src[x],
		x: findPos(x, 55, 3), y: 3,
		height: 55, width: 55,
		click: function(layer){
			$comicCanvas.addLayer({
				type:'image',
				source: layer.source,
				x: 0, y: 0,
				draggable: false
			}).drawLayers();
		}
	})
	$sideCanvas.addLayerToGroup(name, 'backgrounds')
}
$sideCanvas.drawLayers();