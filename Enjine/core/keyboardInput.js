/**
	Class that helps to manage keyboard input.
	Code by Rob Kleffner, 2011
*/

Enjine.Keys = {
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40
};

Enjine.KeyboardInput = function() {
    pressed = new Array();  
}

Enjine.KeyboardInput.prototype = {
    Initialize: function() {
        var self = this;
        document.onkeydown = function(event) { self.KeyDownEvent(event); }
        document.onkeyup = function(event) { self.KeyUpEvent(event); }
    },
    
    IsKeyDown: function(key) {
        if (pressed[key] != null)
            return pressed[key];
        return false;
    },
    
    KeyDownEvent: function(event) {
        pressed[event.keyCode] = true;
    },
    
    KeyUpEvent: function(event) {
        pressed[event.keyCode] = false;
    }
}