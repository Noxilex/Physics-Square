function Light(ctx,x,y){
	var that = this;
	this.x = x;
	this.y = y;
	this.image = null;
	this.offset_x = 0;
	this.offset_y = 0;
	this.initialPosition = null;
	this.finalPosition = null;
	this.force = null;
	this.state = "CONTROL";

	this.getImage = function(url){
		var image = new Image();
		image.onload = function(){
			that.offset_x = image.width/2;
			that.offset_y = image.width/2;
			that.image = image;
		}
		image.src = "img/light.png";
	}

	this.draw = function(){
		if(this.x != null && this.y != null && this.image){
			ctx.drawImage(this.image, this.x-this.offset_x, this.y-this.offset_y);
		}
	}

	this.applyForce = function(force){
		this.state = "FREE";
		this.force = force;
	}

	this.cancelForce = function(){
		this.state = "CONTROL";
		this.force = null;
	}

	this.applyMousePos = function(mousePos){
		if(mousePos){
				this.x = mousePos.x;
				this.y = mousePos.y;
			}
	}

	this.incPos = function(xAdd, yAdd){
		var x = this.x;
		var y = this.y;

		if(xAdd + x >= 0 && xAdd + x <= width)
			this.x += xAdd;
		else if( xAdd + x > width){
			this.x = width;
			this.collisionX = "RIGHT";
		}
		else{
			this.x = 0;
			this.collisionX = "LEFT";
		}

		if(yAdd + y >= 0 && yAdd + y <= height){
			this.y += yAdd;
		}
		else if(yAdd + y > height){
			this.y = height;
			this.collisionY = "BOTTOM";
		}
		else{
			this.y = 0;
			this.collisionY = "TOP";
		}
	}

	this.resetCollisions = function(){
		this.collisionX = null;
		this.collisionY = null;
	}

	this.update = function(){
		if(this.force){
			//Find it there is a collision
			this.incPos(this.force.x, this.force.y);

			//Modify force accordingly
			if(this.collisionY){
				this.force.y = -this.force.y;
			}
			if(this.collisionX){
				this.force.x = -this.force.x;
			}

			this.resetCollisions();
			
		}
		this.draw();
	}

	return this;
}