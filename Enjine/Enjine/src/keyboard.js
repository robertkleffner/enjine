(function() {
  /*
  	Class that helps to manage keyboard input.
  	Code by Rob Kleffner, 2011
  */
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.module("Enjine", function() {
    return this.Keys = {
      a: 65,
      b: 66,
      c: 67,
      d: 68,
      e: 69,
      f: 70,
      g: 71,
      h: 72,
      i: 73,
      j: 74,
      k: 75,
      l: 76,
      m: 77,
      n: 78,
      o: 79,
      p: 80,
      q: 81,
      r: 82,
      s: 83,
      t: 84,
      u: 85,
      v: 86,
      w: 87,
      x: 88,
      y: 89,
      z: 80,
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };
  });
  this.module("Enjine", function() {
    return this.Keyboard = {
      pressed: [],
      initialize: function() {
        document.onkeydown = __bind(function(event) {
          return this.keyDownEvent(event);
        }, this);
        return document.onkeyup = __bind(function(event) {
          return this.keyUpEvent(event);
        }, this);
      },
      isKeyDown: function(key) {
        if (this.pressed[key] != null) {
          this.pressed[key];
        }
        return false;
      },
      keyDownEvent: function(event) {
        return this.pressed[event.keyCode] = true;
      },
      keyUpEvent: function(event) {
        return this.pressed[event.keyCode] = false;
      }
    };
  });
}).call(this);
