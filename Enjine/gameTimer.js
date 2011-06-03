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
        var self = this;
        this.lastTime = new Date().getTime();
        this.intervalFunc = setInterval(function() { self.tick() }, this.framesPerSecond);
    },
    
    tick: function() {
        var newTime = new Date().getTime();
    	var delta = (newTime - this.lastTime) / 1000;
		
        if (this.updateObject != null) {
    		this.lastTime = newTime;    
            this.updateObject.update(delta);
        }
    },
    
    stop: function() {
        clearInterval(this.intervalFunc);
    }
}