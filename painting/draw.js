var context = document.getElementById('canvas').getContext("2d");
var clickX = new Array();
var clickY = new Array();
var X, Y;
var clickDrag = new Array();
var strokeColor = new Array();
var strokeThickness = new Array();
var currentColor = 'black';
var currentThickness = 5;
var currentTool = "pencil"
var paint;


$('#canvas').mousedown(function(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	paint = true;
	if (currentTool == 'pencil' | currentTool == "brush" | currentTool == 'highlight'){
		addClick(mouseX, mouseY);
	}else{
		X = mouseX;
		Y = mouseY;
	}
	redraw();
});

$('#canvas').mousemove(function(e){
	if(paint){
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

$('#canvas').mouseup(function(e){
	paint = false;
});



function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	strokeColor.push(currentColor);
	strokeThickness.push(currentThickness);
}

function redraw(){

	// to clear the canvas (I dont want to in this instance)
	//context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	if (currentTool == 'pencil'){
		// draw the stroke
		context.lineJoin = "round";

		for(var i=0; i < clickX.length; i++) {

			context.strokeStyle = strokeColor[i];
			context.lineWidth = strokeThickness[i];
			context.beginPath();
			if(clickDrag[i] && i){
				context.moveTo(clickX[i-1], clickY[i-1]);
			}else{
				context.moveTo(clickX[i]-1, clickY[i]);
			}
			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.stroke();
		}
	}else if (currentTool == 'spray'){
		// https://stackoverflow.com/questions/16451749/how-to-add-spray-paint-tool-for-html5-canvas
		// http://jsbin.com/awiyan/3/edit?html,css,js,output
		let dots = 20;
		let radius = currentThickness + 5;
		context.fillStyle = currentColor;
		context.beginPath();            // to allocate new style (color, thickness etc) to a drawing
			context.rect(X, Y, 1, 1);
			for(var j=0; j < dots; j++){
				let x = X +  Math.cos( Math.random() * Math.PI * 2 ) * radius * Math.random();
				let y = Y +  Math.sin( Math.random() * Math.PI * 2 ) * radius * Math.random();

				context.rect(x, y, 1, 1);
				context.fill()
			}
		context.closePath();
	}

}

function setColor(clr) {
	currentColor = clr;
}

function setTool(tool) {
	currentTool = tool;
	// change cursor image
	//$('#canvas').css('cursor',"url(img/" + tool +  ".png), auto")
}

function setThickness(w) {
	if (w==1) currentThickness = 1;
	if (w==2) currentThickness = 10;
	if (w==3) currentThickness = 15;
}