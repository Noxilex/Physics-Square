/*** Drawing ***/

c.width = width;
c.height = height;

var resizeCanvas = function(){
	width = window.innerWidth;
	height = window.innerHeight;

	c.width = width;
	c.height = height;
	draw();
}
var mousePosition = null;
var getMousePosAndApplyIt = function(evt){
	mousePosition = getMousePos(c, evt);
	if(light.state == "CONTROL"){
		light.applyMousePos(mousePosition);
		for(var i = 0; i < squares.length; i++){
			squares[i].getMousePos(mousePosition);
		}
	}
}

var prepareLaunch = function(evt){
	light.cancelForce();
	console.log("prepareFire");
	light.initialPosition = getMousePos(c, evt);
}

var launchLight = function(evt){
	console.log("Launch !")
	light.finalPosition = getMousePos(c, evt);
	var force_x = light.initialPosition.x - light.finalPosition.x;
	var force_y = light.initialPosition.y-light.finalPosition.y;
	var forceVector = new Vector(force_x, force_y);
	console.log(forceVector)
	forceVector.multiply(0.1);
	console.log(forceVector)
	light.applyForce(forceVector);
}

window.addEventListener('resize', resizeCanvas, false);
c.addEventListener('mousemove', getMousePosAndApplyIt, false);
c.addEventListener('mousedown', prepareLaunch, false);
c.addEventListener('mouseup', launchLight, false);

/*** Model ***/

var rows;
var columns;
var squares;
var light = new Light(ctx, null, null);
var setup = function(){
	rows = width/SQUAREWIDTH;
	columns = height/SQUAREWIDTH;
	squares = [];
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < columns; j++){
			squares.push(new Square(ctx,i*SQUAREWIDTH, j*SQUAREWIDTH, SQUAREWIDTH));
		}
	}
	light = new Light(ctx, null, null);
	light.getImage();
}

setup();

/*** Update ***/

var requestAnimationFrame = window.requestAnimationFrame || 
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame;

var currentRequestAnimation;

var update = function(){
	clean();

	light.update();

	for(var i = 0; i < squares.length; i++){
		if(light.state == "FREE"){
					squares[i].getMousePos({x:light.x, y:light.y});
		}
		squares[i].update();
	}
	
	draw()

	requestAnimationFrame(update);
}

var reset = function(){
	setup();
}

var draw = function(){

}

var clean = function(){
	/*ctx.fillStyle = "black";
	ctx.fillRect(0, 0, c.width, c.height);*/
	ctx.clearRect(0, 0, c.width, c.height);
}

update();
