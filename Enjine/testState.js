/**
	Test state for the engine.
	Code by Rob Kleffner, 2011
*/

Enjine.TestState = function() {
    this.drawManager = null;
    this.resources = null;
    this.mainSprite = null;
    this.otherSprite = null;
    this.animating = false;
    this.xDirection = 1;
    this.yDirection = 1;
    this.camera = null;
}

Enjine.TestState.prototype = new Enjine.GameState();

Enjine.TestState.prototype.Enter = function() {
    Enjine.Resources.AddImage("run", "run.png");
    
    this.drawManager = new Enjine.DrawableManager();
    this.camera = new Enjine.Camera();
    this.SetupAnimatedSprite();
}

Enjine.TestState.prototype.Exit = function() {
    this.drawManager.Clear();
    delete this.drawManager;
    delete this.camera;
}

Enjine.TestState.prototype.Update = function(delta) {
    this.drawManager.Update(delta);
        
    var running = false;
    this.xDirection = 0;
    this.yDirection = 0;
    
    if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Left)) {
        this.xDirection = -1;
        running = true;
    }
    if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Right)) {
        this.xDirection = 1;
        running = true;
    }
    if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Up)) {
        this.yDirection = -1;
        running = true;
    }
    if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Down)) {
        this.yDirection = 1;
        running = true;
    }
    
    if (!this.animating && running) {
        this.animating = true;
        this.mainSprite.Base.PlaySequence("running", true);
    } else if (this.animating && !running) {
        this.animating = false;
        this.mainSprite.Base.PlaySequence("standing", false);
    }
    
    this.mainSprite.Base.X += delta * 75 * this.xDirection;
    this.mainSprite.Base.Y += delta * 75 * this.yDirection;
    
    this.otherSprite.Update();
    this.mainSprite.Update();
    this.mainSprite.CheckCollision(this.otherSprite);
}

Enjine.TestState.prototype.Draw = function(context) {
    this.drawManager.Draw(context, this.camera)
}

Enjine.TestState.prototype.SetupAnimatedSprite = function() {
        
    this.mainSprite = new Enjine.AnimatedSprite();
    this.mainSprite.Image = Enjine.Resources.Images["run"];
    this.mainSprite.SetColumnCount(12);
    this.mainSprite.SetRowCount(1);
    this.mainSprite.AddNewSequence("standing", 0, 0, 0, 0);
    this.mainSprite.AddNewSequence("running", 0, 0, 0, 11);
    this.mainSprite.PlaySequence("standing", false);
    this.mainSprite = new Enjine.Collideable(this.mainSprite, 48, 48, this.PlayerCollision);
    
    this.otherSprite = new Enjine.AnimatedSprite();
    this.otherSprite.Image = Enjine.Resources.Images["run"];
    this.otherSprite.SetColumnCount(12);
    this.otherSprite.SetRowCount(1);
    this.otherSprite.AddNewSequence("running", 0, 0, 0, 11);
    this.otherSprite.PlaySequence("running", true);
    this.otherSprite.X = 70;
    this.otherSprite.Y = 70;
    this.otherSprite = new Enjine.Collideable(this.otherSprite, 48, 48, this.PlayerCollision);
    
    this.drawManager.Add(this.mainSprite.Base);
    this.drawManager.Add(this.otherSprite.Base);
}

Enjine.TestState.prototype.PlayerCollision = function(other) {

}