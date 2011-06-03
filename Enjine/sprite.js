/**
	Represents a simple static sprite.
	Code by Rob Kleffner, 2011
*/

$e.Sprite = function() {
	this.X = 0;
	this.Y = 0;
	this.Image = null;
}

$e.Sprite.prototype = new $e.Drawable();

$e.Sprite.prototype.Draw = function(context, camera) {
	context.drawImage(this.Image, this.X - camera.X, this.Y - camera.Y);
}