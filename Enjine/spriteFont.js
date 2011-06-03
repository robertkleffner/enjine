/**
	Represents a sprite sheet for a font.
	Code by Rob Kleffner, 2011
*/

$e.SpriteFont = function(image, letterWidth, letterHeight, letters) {
    this.image = image;
    this.letters = letters;
    this.letterWidth = letterWidth;
    this.letterHeight = letterHeight;
    this.strings = [];
};

$e.SpriteFont.prototype = new $e.Drawable();

$e.SpriteFont.prototype.addString = function(str, xPos, yPos) {
	var strObj = { string: str, x: xPos, y: yPos };
	this.strings.push(strObj);
	return this;
};

$e.SpriteFont.prototype.removeString = function(index) {
	this.strings.splice(index, 1);
	return this;
};

$e.SpriteFont.prototype.draw = function(context, camera) {
	var code = 0;
	var i = 0;
	var str = null;
	var s = 0;
	var x = 0;
	var y = 0;
	
    for (s = 0; s < this.strings.length; s++) {
        str = this.strings[s];
		x = str.x;
		y = str.y;
		
        for (i = 0; i < str.string.length; i++) {
            code = str.string.charCodeAt(i);
			
			if (code === 10) {
				//handle line break
				y += this.letterHeight;
				x = str.x;
			} else {
				context.drawImage(this.image, this.letters[code].x, this.letters[code].y, this.letterWidth, this.letterHeight, x - camera.x, y - camera.y, this.letterWidth, this.letterHeight);
				x += this.letterWidth;
			}
		}
    }
};