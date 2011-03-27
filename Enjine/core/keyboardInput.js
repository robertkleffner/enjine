/**
	Class that helps to manage keyboard input.
	Code by Rob Kleffner, 2011
*/

Enjine.KeyboardInput = function() {
    this.KeysDown = null;
    this.KeysPressed = null;
    this.KeysUp = null;
    
    var self = this;
    document.onkeydown = function(event) { self.KeyDownEvent(event); }
    document.onkeypress = function(event) { self.KeyPressedEvent(event); }
    document.onkeyup = function(event) { self.KeyUpEvent(event); }
}

Enjine.KeyboardInput.prototype = {
    KeyDownEvent: function(event) {
        this.KeysDown = event.keyCode;
    },
    
    KeyPressedEvent: function(event) {
        this.KeysPressed = event.keyCode;
    },
    
    KeyUpEvent: function(event) {
        this.KeysUp = event.keyCode;
    }
}