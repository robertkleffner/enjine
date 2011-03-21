/**
	Represents a simple static sprite.
	Code by Rob Kleffner, 2011
*/

Enjine.Sprite = function() {
	this.X = 0;
	this.Y = 0;
	this.ZOrder = 0;
	this.Image = null;
	
	this.Draw = function(context, camera) {
		context.drawImage(this.Image, this.X - camera.X, this.Y - camera.Y);
	};
}