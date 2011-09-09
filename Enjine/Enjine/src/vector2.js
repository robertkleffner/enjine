(function() {
  /*
    Contains useful functions for making 2D vector math easier.
    Code by Rob Kleffner, 2011
  */  this.module("Enjine", function() {
    return this.Vector2 = (function() {
      function Vector2(x, y) {
        this.x = x;
        this.y = y;
      }
      Vector2.prototype.equals = function(vecOrX, y) {
        if (vecOrX instanceof Enjine.Vector2) {
          return this.x === vecOrX.x && this.y === vecOrX.y;
        } else {
          return this.x === vecOrX && this.y === y;
        }
      };
      Vector2.prototype.dot = function(vec) {
        return this.x * vec.x + this.y * vec.y;
      };
      Vector2.prototype.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      };
      Vector2.prototype.normalize = function() {
        var len;
        len = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x / len;
        this.y / len;
        return this;
      };
      Vector2.prototype.add = function(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
      };
      Vector2.prototype.sub = function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
      };
      Vector2.prototype.scale = function(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
      };
      Vector2.prototype.mul = function(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        return this;
      };
      Vector2.prototype.div = function(vec) {
        this.x /= vec.x;
        this.y /= vec.y;
        return this;
      };
      Vector2.zero = new Vector2(0, 0);
      Vector2.one = new Vector2(1, 1);
      Vector2.unitX = new Vector2(1, 0);
      Vector2.unitY = new Vector2(0, 1);
      Vector2.dot = function(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
      };
      Vector2.len = function(vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
      };
      Vector2.add = function(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
      };
      Vector2.sub = function(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
      };
      Vector2.scale = function(vec, scalar) {
        return new Vector2(vec.x * scalar, vec.y * scalar);
      };
      Vector2.mul = function(v1, v2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
      };
      Vector2.div = function(v1, v2) {
        return new Vector2(v1.x / v2.x, v1.y / v2.y);
      };
      return Vector2;
    })();
  });
}).call(this);
