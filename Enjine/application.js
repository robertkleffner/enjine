/**
	Simple demo of the engine.
	Code by Rob Kleffner, 2011
*/

$e.Application = function() {
    this.canvas = null;
    this.timer = null;
    this.stateContext = null;
}

$e.Application.prototype = {
    Update: function(delta) {
        
        this.stateContext.Update(delta);
        
        this.canvas.BeginDraw();
        
        this.stateContext.draw(this.canvas.BackBufferContext2D);
        
        this.canvas.EndDraw();
    },
    
    Initialize: function(defaultState, resWidth, resHeight) {
        this.canvas = new $e.GameCanvas();
        this.timer = new $e.GameTimer();
        $e.Keyboard.Initialize();      
        this.canvas.Initialize("canvas", resWidth, resHeight);
        this.timer.UpdateObject = this;
        
        this.stateContext = new $e.GameStateContext(defaultState);
        
        this.timer.Start();
    }
}