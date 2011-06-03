/**
	Simple State pattern implementation for game states.
	Code by Rob Kleffner, 2011
*/

$e.GameStateContext = function(defaultState) {
    this.State = null;
    
    if (defaultState != null) {
        this.State = defaultState;
        this.State.Enter();
    }
}

$e.GameStateContext.prototype = {
    ChangeState: function(newState) {
        if (this.State != null) {
            this.State.Exit();
        }
        this.State = newState;
        this.State.Enter();
    },
    
    Update: function(delta) {
        this.State.CheckForChange(this);
        this.State.Update(delta);
    },
    
    draw: function(delta) {
        this.State.draw(delta);
    }
}

/**
 * Base game state class to at least ensure that all the functions exist.
 */ 
$e.GameState = function() { }

$e.GameState.prototype = {
    Enter: function () {},
    Exit: function() {},
    Update: function(delta) {},
    draw: function(context) {},
    CheckForChange: function(context) {}
}