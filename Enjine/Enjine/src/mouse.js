(function() {
  /*
    Class that helps to manage mouse input.
    Code by Rob Kleffner, 2011
  */
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.module("Enjine", function() {
    return this.Buttons = {
      mouseLeft: 0,
      mouseRight: 2,
      mouseWheel: 1
    };
  });
  this.module("Enjine", function() {
    return this.Mouse = {
      x: 0,
      y: 0,
      pressed: [],
      wasPressed: [],
      element: null,
      containsMouse: false,
      initialize: function(element) {
        this.element = element;
        element.onmousedown = __bind(function(event) {
          return this.pressed[event.button] = true;
        }, this);
        element.onmouseup = __bind(function(event) {
          return this.pressed[event.button] = false;
        }, this);
        element.onmousemove = __bind(function(event) {
          return this.mouseMoveEvent(event);
        }, this);
        element.onmouseover = __bind(function(event) {
          return this.containsMouse = true;
        }, this);
        return element.onmouseout = __bind(function(event) {
          this.containsMouse = false;
          this.x = -1;
          return this.y = -1;
        }, this);
      },
      isButtonDown: function(key) {
        if (this.pressed[key] != null) {
          return this.pressed[key];
        }
        return false;
      },
      wasButtonDown: function(key) {
        if (this.wasPressed[key] != null) {
          return this.wasPressed[key] && !this.pressed[key];
        }
        return false;
      },
      mouseMoveEvent: function(event) {
        var obj, _results;
        this.x = event.pageX;
        this.y = event.pageY;
        obj = this.element;
        if (obj.offsetParent) {
          _results = [];
          while (obj) {
            this.x -= obj.offsetLeft;
            this.y -= obj.offsetTop;
            _results.push(obj = obj.offsetParent);
          }
          return _results;
        }
      },
      updatePressed: function() {
        return this.wasPressed = this.pressed.slice(0);
      }
    };
  });
}).call(this);
