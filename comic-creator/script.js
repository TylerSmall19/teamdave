

var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $sideCanvas = $('#sidebar-canvas'); // <canvas id="sidebar-canvas" width="180" height="742">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var sideCanvasArray = [];
var hasBackground = false;
var src = ['img/bg-1.png', 'img/bg-2.png'];

//Function variables for layer events
var drawFunction = function draw(){
	$comicCanvas.drawImage({
		source: "img/bg-1.png",
		width: 767, height: 575
	})
}

function findPos(imgNum, size, padding){
	var pos;
	pos = imgNum * size + padding;
	return pos;
}

for (i = 0; i < src.length; i++){
	$sideCanvas.addLayer({
		type: 'image',
		name: src[i],
		source: src[i],
		x: findPos(i, 50, 3), y: 3,
		height: 50, width: 50
	})
	$sideCanvas.addLayerToGroup(src[i], 'backgrounds')
}
$sideCanvas.drawLayers();
console.log($sideCanvas.getLayerGroup('backgrounds'))

// $sideCanvas.drawImage({
// 	name: "bg1",
// 	layer: true,
// 	source: "img/bg-1.png",
// 	x: 3, y: 3,
// 	width: 50, height: 50,
// 	fromCenter: false,
// 	click: function draw(){
// 		$comicCanvas.drawImage({
// 			source: src,
// 			width: 767, height: 575
// 		})
// 	}
// });

// $sideCanvas.drawImage({
// 	source: "img/bg-2.png",
// 	layer: true,
// 	name: "bg2",
// 	x: 61, y: 3,
// 	width: 50, height: 50,
// 	fromCenter: false
// 	//Add double click event to image
// });

// $sideCanvas.addLayer({
// 	name: 'bg3',
// 	type: 'image',
// 	source: 'img/bg-3.jpg',
// 	x: 119, y: 3,
// 	width: 50, height: 50,
// 	fromCenter: false,
// 	click: drawFunction
// })
// .drawLayers();



