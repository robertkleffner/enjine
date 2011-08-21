(function() {
  /*
  	Represents a very basic game timer.
  	Code by Rob Kleffner, 2011
  */
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.module("Enjine", function() {
    return this.GameTimer = (function() {
      function GameTimer() {}
      GameTimer.prototype.framesPerSecond = 1000 / 30;
      GameTimer.prototype.lastTime = 0;
      GameTimer.prototype.intervalFunc = null;
      GameTimer.prototype.updateObject = null;
      GameTimer.prototype.start = function() {
        this.lastTime = new Date().getTime();
        this.intervalFunc = setInterval((__bind(function() {
          return this.tick();
        }, this)), this.framesPerSecond);
        return this;
      };
      GameTimer.prototype.tick = function() {
        var delta, newTime;
        newTime = new Date().getTime();
        delta = (newTime - this.lastTime) / 1000;
        if (this.updateObject != null) {
          this.lastTime = newTime;
          this.updateObject.update(delta);
        }
        return this;
      };
      GameTimer.prototype.stop = function() {
        clearInterval(this.intervalFunc);
        return this;
      };
      return GameTimer;
    })();
  });
}).call(this);
