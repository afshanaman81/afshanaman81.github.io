var context = document.getElementById('canvas').getContext("2d");
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var strokeColor = new Array();
var strokeThickness = new Array();
var currentColor = 'black';
var currentThickness = 5;
var paint;


$('#canvas').mousedown(function(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	paint = true;
	addClick(mouseX, mouseY);
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



function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	strokeColor.push(currentColor);
	strokeThickness.push(currentThickness);
}

function redraw(){

	// clear the canvas
	//context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	// draw the stroke
	context.lineJoin = "round";

	for(var i=0; i < clickX.length; i++) {
		context.beginPath();
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.strokeStyle = strokeColor[i];
		context.lineWidth = strokeThickness[i];
		context.stroke();
	}
}

function setColor(clr) {
	currentColor = clr;

}

function setThickness(w) {
	if (w==1) currentThickness = 1;
	if (w==2) currentThickness = 10;
	if (w==3) currentThickness = 15;
}