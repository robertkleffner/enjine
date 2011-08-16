(function() {
  /*
  	Simple state pattern implementation for game states.
  	Code by Rob Kleffner, 2011
  */  this.module("Enjine", function() {
    var GameState, GameStateContext;
    GameStateContext = (function() {
      function GameStateContext(defaultState) {
        this.state = null;
        if (defaultState != null) {
          this.state = defaultState;
          this.state.enter();
        }
      }
      GameStateContext.prototype.changeState = function(newState) {
        if (this.state != null) {
          this.state.exit();
        }
        this.state = newState;
        return this.state.enter();
      };
      GameStateContext.prototype.update = function(delta) {
        if (this.state != null) {
          this.state.checkForChange(this);
          return this.state.update(delta);
        }
      };
      GameStateContext.prototype.draw = function(delta) {
        var _ref;
        return (_ref = this.state) != null ? _ref.draw(delta) : void 0;
      };
      return GameStateContext;
    })();
    return GameState = (function() {
      function GameState() {}
      GameState.prototype.enter = function() {};
      GameState.prototype.exit = function() {};
      GameState.prototype.update = function() {};
      GameState.prototype.draw = function() {};
      GameState.prototype.checkForChange = function(context) {};
      return GameState;
    })();
  });
}).call(this);
