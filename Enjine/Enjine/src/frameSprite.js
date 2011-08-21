(function() {
  /*
  	For sprites that are only a portion of an image.
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
    return this.FrameSprite = (function() {
      __extends(FrameSprite, this.Sprite);
      function FrameSprite() {
        FrameSprite.__super__.constructor.apply(this, arguments);
      }
      FrameSprite.prototype.frameX = 0;
      FrameSprite.prototype.frameY = 0;
      FrameSprite.prototype.frameWidth = 0;
      FrameSprite.prototype.frameHeight = 0;
      FrameSprite.prototype.draw = function(context, camera) {
        context.save();
        context.translate(this.x - camera.x, this.y - camera.y);
        context.rotate(angle);
        context.scale(this.xScale, this.yScale);
        context.drawImage(this.image, this.frameX, this.frameY, this.frameWidth, this.frameHeight, -this.frameWidth * this.xPivot, -this.frameHeight * this.yPivot, this.frameWidth, this.frameHeight);
        context.restore();
        return this;
      };
      return FrameSprite;
    }).call(this);
  });
}).call(this);
