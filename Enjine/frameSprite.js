/**
	For sprites that are only a portion of an image.
	Code by Rob Kleffner, 2011
*/

$e.FrameSprite = function() {
    this.frameX = 0;
    this.frameY = 0;
	this.frameWidth = 0;
    this.frameHeight = 0;
};

$e.FrameSprite.prototype = new $e.Sprite();

$e.FrameSprite.prototype.draw = function(context, camera) {
    context.drawImage(this.image, this.frameX, this.frameY, this.frameWidth, this.frameHeight, this.x - camera.x, this.y - camera.y, this.frameWidth, this.frameHeight);
};