/**
	Represents a very basic game timer.
	Code by Rob Kleffner, 2011
*/

$e.GameTimer = function() {
    this.framesPerSecond = 1000 / 30;
	this.lastTime = 0;
    this.intervalFunc = null;
    this.updateObject = null;
}

$e.GameTimer.prototype = {
    start: function() {
        this.lastTime = new Date().getTime();
        var self = this;
        this.intervalFunc = setInterval(function() { self.tick() }, this.framesPerSecond);
    },
    
    tick: function() {
        if (this.updateObject != null) {
            var newTime = new Date().getTime();
    		var delta = (newTime - this.lastTime) / 1000;
    		this.lastTime = newTime;
            
            this.updateObject.update(delta);
        }
    },
    
    stop: function() {
        clearInterval(this.intervalFunc);
    }
}