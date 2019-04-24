function Square(ctx,x,y,width, imgData){
	var that = this;
	this.initialX = x;
	this.initialY = y;
	this.width = width;
	this.offset_x = width/2;
	this.offset_y = width/2;
	this.x = x;
	this.y = y;

	//this.gravityCenter = {x:this.x-this.offset_x, y:this.y-this.offset_y};

	this.initialColorT = [10,0,0];
	this.colorT = [10,0,0];
	//3 states, one for each part of the coloring
	this.state = 0;
	this.mousePos = null;

	this.draw = function(){
		ctx.fillStyle = colorTableToString(this.colorT);
		ctx.fillRect(this.x, this.y, this.width, this.width);
	}

	this.getMousePos = function(mousePos){
		this.mousePos = mousePos;
	}

	this.computeForce = function(){
		var distMouse = distance(this.mousePos, {x:this.x, y:this.y});
		var distInitial = distance({x:this.initialX, y:this.initialY}, {x:this.x, y:this.y});
		var forceMouse = 0;
		var forceInitial = 0;
		if(distMouse != 0)
			forceMouse = MAXFORCE/Math.pow(distMouse,2);
		if(distInitial != 0)
			forceInitial = distInitial/MAXFORCE

		var difXMouse = this.x-this.mousePos.x;
		var difYMouse = this.y-this.mousePos.y;

		var difXInitial = this.initialX-this.x;
		var difYInitial = this.initialY-this.y;

		//Conditions to prevent squares from disappearing
		if(difXMouse*forceMouse+difXInitial*forceInitial < width)
			this.x += difXMouse*forceMouse+difXInitial*forceInitial;
		else
			this.x += width + SQUAREWIDTH;
		if (difYMouse*forceMouse+difYInitial*forceInitial < height)
			this.y += difYMouse*forceMouse+difYInitial*forceInitial;
		else
			this.y += height + SQUAREWIDTH;
	}

	this.update= function(){
		if(this.mousePos)
		{
			this.colorT = colorMouseRelative(distance({x:this.x, y:this.y}, {x:this.mousePos.x, y:this.mousePos.y}), 7000, this.initialColorT);
			this.computeForce();
		}
		this.draw();
	}

	return this;
}