(function() {
  /*
  	Base class for all drawable object, makes ordering automatic.
  	Code by Rob Kleffner, 2011
  */  this.module("Enjine", function() {
    return this.Drawable = (function() {
      function Drawable() {}
      Drawable.prototype.zOrder = 0;
      Drawable.prototype.draw = function(context) {};
      return Drawable;
    })();
  });
}).call(this);
