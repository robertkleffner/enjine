/**
	Simple State pattern implementation for game states.
	Code by Rob Kleffner, 2011
*/

Enjine.GameStateContext = function(defaultState) {
    var state = null;
    this.ChangeState(defaulState);
}

Enjine.GameStateContext.prototype = {
    ChangeState: function(newState) {
        if (state != null) {
            state.Exit();
        }
        state = newState;
        state.Enter();
    },
    
    Update: function(delta) {
        state.CheckForChange(this);
        state.Update(delta);
    },
    
    Draw: function(delta) {
        state.Draw(delta);
    }
}

/**
 * Base game state class to at least ensure that all the functions exist.
 */ 
Enjine.GameState = function() { }

Engine.GameState.prototype = {
    Enter: function () {},
    Exit: function() {},
    Update: function() {},
    Draw: function() {},
    CheckForChange: function() {}
}