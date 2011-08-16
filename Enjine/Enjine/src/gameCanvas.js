(function() {
  /*
  	Base class to represent a double buffered canvas object.
  	Code by Rob Kleffner, 2011
  */
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.module("Enjine", function() {
    var GameCanvas;
    return GameCanvas = (function() {
      function GameCanvas() {}
      GameCanvas.prototype.canvas = null;
      GameCanvas.prototype.context2D = null;
      GameCanvas.prototype.backBuffer = null;
      GameCanvas.prototype.backBufferContext2D = null;
      GameCanvas.prototype.betterBuffer = null;
      GameCanvas.prototype.autoResolutionMode = false;
      GameCanvas.prototype.initialize = function(canvasId, resWidth, resHeight) {
        this.canvas = document.getElementById(canvasId);
        this.context2D = this.canvas.getContext("2d");
        this.backBuffer = document.createElement("canvas");
        this.backBuffer.width = resWidth;
        this.backBuffer.height = resHeight;
        this.backBufferContext2D = this.backBuffer.getContext("2d");
        this.betterBuffer = this.backBufferContext2D;
        this.betterBuffer.width = this.backBuffer.width;
        this.betterBuffer.height = this.backBuffer.height;
        return this;
      };
      GameCanvas.prototype.beginDraw = function() {
        return this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
      };
      GameCanvas.prototype.endDraw = function() {
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this.context2D.drawImage(this.backBuffer, 0, 0, this.backBuffer.width, this.backBuffer.height, 0, 0, this.canvas.width, this.canvas.height);
      };
      GameCanvas.prototype.fullScreen = function(autoRes) {
        this.autoResolutionMode = autoRes;
        this.changeCanvasSize(window.innerWidth, window.innerHeight);
        window.onresize = __bind(function() {
          document.body.style.margin = "0";
          document.body.style.padding = "0";
          this.canvas.width = window.innerWidth;
          this.canvas.height = window.innerHeight;
          if (this.autoResolutionMode) {
            this.backBuffer.width = this.canvas.width;
            this.backBuffer.height = this.canvas.height;
            this.betterBuffer.width = this.canvas.width;
            return this.betterBuffer.height = this.canvas.height;
          }
        }, this);
        return this;
      };
      GameCanvas.prototype.changeCanvasResolution = function(resWidth, resHeight) {
        this.autoResolutionMode = false;
        this.backBuffer.width = resWidth;
        this.backBuffer.height = resHeight;
        this.betterBuffer.width = resWidth;
        this.betterBuffer.height = resHeight;
        return this;
      };
      GameCanvas.prototype.changeCanvasSize = function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        window.onresize = null;
        if (this.autoResolutionMode) {
          this.backBuffer.width = width;
          this.backBuffer.height = height;
          this.betterBuffer.width = width;
          this.betterBuffer.height = height;
        }
        return this;
      };
      return GameCanvas;
    })();
  });
}).call(this);
