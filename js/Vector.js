function Vector(x,y){
	this.x = x;
	this.y = y;

	this.add = function(x, y){
		if(x && y){
			this.x += x;
			this.y += y;
		}else if(!y){
			this.x += x;
			this.y += x;
		}
	}

	this.multiply = function(x,y){
		if(x && y){
			this.x *= x;
			this.y *= y;
		}else if(!y){
			this.x *= x;
			this.y *= x;
		}
	}
}