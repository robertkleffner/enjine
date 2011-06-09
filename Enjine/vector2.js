/**
	Contains useful functions for making 2D vector math easier.
	Code by Rob Kleffner, 2011
*/

$e.Vector2 = function(x, y) {
	this.x = x;
	this.y = y;
};

$e.Vector2.prototype = {
	equals: function(vec) {
		return (this.x === vec.x && this.y === vec.y);
	},

	dot: function(vec) {
		return this.x * vec.x + this.y * vec.y;
	},

	len: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	
	normalize: function() {
		//same as len(), but quicker to calculate it here and save function call overhead
		var len = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= len;
		this.y /= len;
		return this;
	},
	
	add: function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	},
	
	sub: function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	},
	
	scale: function(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	},
	
	mul: function(vec) {
		this.x *= vec.x;
		this.y *= vec.y;
		return this;
	},
	
	div: function(vec) {
		this.x /= vec.x;
		this.y /= vec.y;
		return this;
	}
};

//Static variables and functions
$e.Vector2.zero = new $e.Vector2(0, 0);
$e.Vector2.one = new $e.Vector2(1, 1);
$e.Vector2.unitX = new $e.Vector2(1, 0);
$e.Vector2.unitY = new $e.Vector2(0, 1);

$e.Vector2.dot = function(v1, v2) {
	return v1.x * v2.x + v1.y * v2.y;
};

$e.Vector2.len = function(vec) {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
};

$e.Vector2.add = function(v1, v2) {
	return new $e.Vector2(v1.x + v2.x, v1.y + v2.y);
};

$e.Vector2.sub = function(v1, v2) {
	return new $e.Vector2(v1.x - v2.x, v1.y - v2.y);
};

$e.Vector2.scale = function(vec, scalar) {
	return new $e.Vector2(vec.x * scalar, vec.y * scalar);
};

$e.Vector2.mul = function(v1, v2) {
	return new $e.Vector2(v1.x * v2.x, v1.y * v2.y);
};

$e.Vector2.div = function(v1, v2) {
	return new $e.Vector2(v1.x / v2.x, v1.y / v2.y);
};