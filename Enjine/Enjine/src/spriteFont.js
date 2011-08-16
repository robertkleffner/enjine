(function() {
  /*
  	Represents a sprite sheet for a font.
  	Code by Rob Kleffner, 2011
  */
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.module("Enjine", function() {
    var SpriteFont;
    return SpriteFont = (function() {
      __extends(SpriteFont, Drawable);
      function SpriteFont(image, letterWidth, letterHeight, letters) {
        this.image = image;
        this.letterWidth = letterWidth;
        this.letterHeight = letterHeight;
        this.letters = letters;
        this.letterSpacing = 0;
        this.lineHeight = 0;
        this.strings = [];
      }
      SpriteFont.prototype.addString = function(str, xPos, yPos) {
        var strObj;
        strObj = {
          string: str,
          x: xPos,
          y: yPos
        };
        this.strings.push(strObj);
        return this;
      };
      SpriteFont.prototype.removeString = function(index) {
        var _ref;
        [].splice.apply(this.strings, [index, index - index + 1].concat(_ref = [])), _ref;
        return this;
      };
      SpriteFont.prototype.draw = function(context, camera) {
        var c, code, i, s, x, y, _i, _len, _len2, _ref, _ref2;
        _ref = this.strings;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          x = s.x;
          y = s.y;
          _ref2 = s.string;
          for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
            c = _ref2[i];
            code = s.string.charCodeAt(i);
            if (code === 10) {
              y += this.letterHeight + this.lineHeight;
              x = s.x;
            } else {
              context.drawImage(this.image, this.letters[code].x, this.letters[code].y, this.letterWidth, this.letterHeight, x - camera.x, y - camera.y, this.letterWidth, this.letterHeight);
              x += this.letterWidth + this.letterSpacing;
            }
          }
        }
        return this;
      };
      return SpriteFont;
    })();
  });
}).call(this);
