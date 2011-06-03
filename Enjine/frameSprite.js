/**
	For sprites that are only a portion of an image.
	Code by Rob Kleffner, 2011
*/

$e.FrameSprite = function() {
    this.FrameX = 0;
    this.FrameY = 0;
	this.FrameWidth = 0;
    this.FrameHeight = 0;
}

$e.FrameSprite.prototype = new $e.Sprite();

$e.FrameSprite.prototype.draw = function(context, camera) {
    context.drawImage(this.image, this.FrameX, this.FrameY, this.FrameWidth, this.FrameHeight, this.x - camera.x, this.y - camera.y, this.FrameWidth, this.FrameHeight);
}