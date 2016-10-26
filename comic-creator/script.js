var $comicCanvas = $('#comic-canvas'); // <canvas id="comic-canvas" height="590" width="767">
var $sideCanvas = $('#sidebar-canvas'); // <canvas id="sidebar-canvas" width="180" height="693">
var $savedComicCanvas = $('#saved-comic-canvas'); //<canvas id="saved-comic-canvas" width="767" height="129">
var hasBackground = false;

// Wrap image in an event handler
$(	//Draw side-bar image
	$sideCanvas.drawImage({
	source: "img/bg-1.png",
	x: 3, y: 3,
	width: 50, 
	height: 50,
	fromCenter: false
	//Add double click event to image
	})
//Only allows one event to populate per element
).click(function(){ 
    $comicCanvas.drawImage({
	source: "img/bg-1.png",
	fromCenter: false,
	draggable: true
	})
	hasBackground = true;
});

// Wrap image in an event handler
$(	//Draw side-bar image
	$sideCanvas.drawImage({
	source: "img/bg-2.png",
	x: 56, y: 3,
	width: 50, 
	height: 50,
	fromCenter: false
	//Add double click event to image
	})
//Only allows one event to populate per element
).click(function(){ 
	if (!hasBackground){
	    $comicCanvas.drawImage({
		source: "img/bg-2.png",
		fromCenter: false,
		draggable: true
		})
	}
});