(function() {
  /*
  	Represents a simple static sprite.
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
    var Sprite;
    return Sprite = (function() {
      __extends(Sprite, Drawable);
      function Sprite() {
        Sprite.__super__.constructor.apply(this, arguments);
      }
      Sprite.prototype.xPivot = 0.5;
      Sprite.prototype.yPivot = 0.5;
      Sprite.prototype.angle = 0;
      Sprite.prototype.xScale = 1;
      Sprite.prototype.yScale = 1;
      Sprite.prototype.image = null;
      Sprite.prototype.draw = function(context, camera) {
        context.save();
        context.translate(this.x - camera.x, this.y - camera.y);
        context.rotate(this.angle);
        context.scale(this.xScale, this.yScale);
        context.drawImage(this.image, -this.image.width * this.xPivot, -this.image.height * this.yPivot);
        context.restore();
        return this;
      };
      return Sprite;
    })();
  });
}).call(this);
