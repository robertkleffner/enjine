(function() {
  /*
  	Define the namespace of the Engine.
  	Also includes functionality that is required for all internal workings of the engine.
  	Code by Rob Kleffner, 2011
  */  window.module = function(name, func) {
    if (!(this[name] != null)) {
      this[name] = {};
    }
    if (!(this[name].module != null)) {
      this[name].module = window.module;
    }
    if (func != null) {
      return func.apply(this[name], []);
    }
  };
  this.module("Enjine");
}).call(this);
