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
	context.save();
	context.translate(this.x - camera.x, this.y - camera.y);
	context.rotate(this.angle);
	context.scale(this.xScale, this.yScale);
    context.drawImage(this.image, this.frameX, this.frameY, this.frameWidth, this.frameHeight, -this.frameWidth * this.xPivot, -this.frameHeight * this.yPivot, this.frameWidth, this.frameHeight);
	context.restore();
};