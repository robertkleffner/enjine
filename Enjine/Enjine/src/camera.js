(function() {
  /*
  	Represents a camera used to offset drawing of sprites in the world.
  	Code by Rob Kleffner, 2011
  */  this.module("Enjine", function() {
    return this.Camera = (function() {
      function Camera() {}
      Camera.prototype.x = 0;
      Camera.prototype.y = 0;
      return Camera;
    })();
  });
}).call(this);
