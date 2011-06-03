/**
	Represents a sprite sheet for a font.
	Code by Rob Kleffner, 2011
*/

$e.SpriteFont = function(strings, image, letterWidth, letterHeight, letters) {
    this.image = image;
    this.letters = letters;
    this.letterWidth = letterWidth;
    this.letterHeight = letterHeight;
    this.strings = strings;
};

$e.SpriteFont.prototype = new $e.Drawable();

$e.SpriteFont.prototype.draw = function(context, camera) {
	var string = null, s = 0, i = 0, code = 0;
    for (var s = 0; s < this.strings.length; s++) {
        string = this.strings[s];
        for (i = 0; i < string.String.length; i++) {
            code = string.String.charCodeAt(i);
            context.drawImage(this.image, this.letters[code].x, this.letters[code].y, this.letterWidth, this.letterHeight, string.x + this.letterWidth * (i + 1), string.y, this.letterWidth, this.letterHeight);
        }
    }
};