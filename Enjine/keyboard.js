/**
	Class that helps to manage keyboard input.
	Code by Rob Kleffner, 2011
*/

$e.Keys = {
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

$e.Keyboard = {
    pressed: new Array(),
    
    initialize: function() {
        var self = this;
        document.onkeydown = function(event) { self.keyDownEvent(event); }
        document.onkeyup = function(event) { self.keyUpEvent(event); }
    },
    
    isKeyDown: function(key) {
        if (this.pressed[key] != null)
            return this.pressed[key];
        return false;
    },
    
    keyDownEvent: function(event) {
        this.pressed[event.keyCode] = true;
    },
    
    keyUpEvent: function(event) {
        this.pressed[event.keyCode] = false;
    }
};