/**
	Represents a simple static sprite.
	Code by Rob Kleffner, 2011
*/

$e.Sprite = function() {
	this.x = 0;
	this.y = 0;
	this.image = null;
};

$e.Sprite.prototype = new $e.Drawable();

$e.Sprite.prototype.draw = function(context, camera) {
	context.drawImage(this.image, this.x - camera.x, this.y - camera.y);
};