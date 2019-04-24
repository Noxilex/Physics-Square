var randomColor = function(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return [r,g,b];
}

var positionColor = function(width, height, x, y){
	//The more yRatio goes UP the darker it gets
	//The more xRatio goes UP the more color changes
	//If yRatio = 0 -> White

	//1er fond, 
	// puis on monte le 2e, 
	// on descend le 1er, 
	// on monte le 3e, 
	// on descend le 2e
	// on monte le 1er
	// on descend le 3e

	
	
	var xRatio = x/width;
	var yRatio = y/height;

	var tmpR = 255;
	var tmpG = 0;
	var tmpB = 0;

	var r = Math.floor(yRatio*tmpR);
	var g = Math.floor(yRatio*tmpG);
	var b = Math.floor(yRatio*tmpB);
	return [r,g,b];
}

var colorTableToString = function(t){
	return "rgb("+t.join(',')+")";
}

var colorMouseRelative = function(mouseDistance, maxDistance, colorT){
	var coef = maxDistance/Math.pow(mouseDistance,2);
	var range = 50;
	var additive = coef*range;
	var colorTmp = [];

	for(var i = 0; i < colorT.length; i++){
		colorTmp.push(Math.floor(colorT[i]*additive));
	}

	return colorTmp;
}

var colorUpdate = function(rgb,state){
	var r = rgb[0]
	var g = rgb[1]
	var b = rgb[2]
	if(r < 255 && state == 0){
		r++;
		if(b>0)
			b--;
	}
	else if(r==255)
		state = 1;

	if(g < 255 && state == 1){
		g++;
		if(r>0)
			r--;
	}
	else if(g==255)
		state = 2;

	if(b < 255 && state == 2){
		b++;
		if(g>0)
			g--;
	}
	else if(b==255)
		state = 0;

	return [[r,g,b],state];
}