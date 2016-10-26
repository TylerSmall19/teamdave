var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $sideCanvas = $('#sidebar-canvas'); // <canvas id="sidebar-canvas" width="180" height="742">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;

//Function variables for layer events
var drawFunction = function draw(layer){
	console.log(layer)
}

function addImage(canvas, src, x, y, h, w, fnc, name){
	canvas.addLayer({
		source: src,
		name: name,
		x: x, y: y,
		height: h, width: w,
		click: fnc
	});
}

// var src = findSrc(canvas);


$sideCanvas.drawImage({
	name: "bg1",
	layer: true,
	source: "img/bg-1.png",
	x: 3, y: 3,
	width: 50, height: 50,
	fromCenter: false,
	click: drawFunction
});

$sideCanvas.drawImage({
	source: "img/bg-2.png",
	layer: true,
	name: "bg2",
	x: 61, y: 3,
	width: 50, height: 50,
	fromCenter: false
	//Add double click event to image
});

$sideCanvas.addLayer({
	name: 'bg3',
	type: 'image',
	source: 'img/bg-3.jpg',
	x: 119, y: 3,
	width: 50, height: 50,
	fromCenter: false,
	click: drawFunction
})
.drawLayers();


// ).click(function(){ 
// 	if (!hasBackground){
// 	    $comicCanvas.drawImage({
// 		source: "img/bg-2.png",
// 		fromCenter: false,
// 		draggable: true
// 		})
// 	}
// });