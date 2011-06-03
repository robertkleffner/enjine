/**
	Simple state pattern implementation for game states.
	Code by Rob Kleffner, 2011
*/

$e.GameStateContext = function(defaultState) {
    this.state = null;
    
    if (defaultState !== null) {
        this.state = defaultState;
        this.state.enter();
    }
};

$e.GameStateContext.prototype = {
    changeState: function(newState) {
        if (this.state !== null) {
            this.state.exit();
        }
        this.state = newState;
        this.state.enter();
    },
    
    update: function(delta) {
        this.state.checkForChange(this);
        this.state.update(delta);
    },
    
    draw: function(delta) {
        this.state.draw(delta);
    }
};

/**
 * Base game state class to at least ensure that all the functions exist.
 */ 
$e.GameState = function() { };

$e.GameState.prototype = {
    enter: function () {},
    exit: function() {},
    update: function(delta) {},
    draw: function(context) {},
    checkForChange: function(context) {}
};