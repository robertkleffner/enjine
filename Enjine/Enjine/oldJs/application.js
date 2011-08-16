/**
	Simple demo of the engine.
	Code by Rob Kleffner, 2011
*/

$e.Application = function() {
    this.canvas = null;
    this.timer = null;
    this.stateContext = null;
};

$e.Application.prototype = {
    update: function(delta) {
        
        this.stateContext.update(delta);
        
        this.canvas.beginDraw();
        
        this.stateContext.draw(this.canvas.betterBuffer);
        
        this.canvas.endDraw();
    },
    
    initialize: function(canvasId, defaultState, resWidth, resHeight) {
        this.canvas = new $e.GameCanvas();
        this.timer = new $e.GameTimer();
        $e.Keyboard.initialize();
		$e.Mouse.initialize(document.getElementById(canvasId));
        this.canvas.initialize(canvasId, resWidth, resHeight);
        this.timer.updateObject = this;
        
        this.stateContext = new $e.GameStateContext(defaultState);
        
        this.timer.start();
    }
};