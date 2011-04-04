/**
	Test state for the engine.
	Code by Rob Kleffner, 2011
*/

Enjine.TestState = function() {
    this.drawManager = null;
    this.mainSprite = null;
    this.animating = false;
    this.xDirection = 1;
    this.yDirection = 1;
    this.camera = null;
}

Enjine.TestState.prototype = new Enjine.GameState();

Enjine.TestState.prototype.Enter = function() {
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
        this.mainSprite.PlaySequence("running", true);
    } else if (this.animating && !running) {
        this.animating = false;
        this.mainSprite.PlaySequence("standing", false);
    }
    
    this.mainSprite.X += delta * 75 * this.xDirection;
    this.mainSprite.Y += delta * 75 * this.yDirection;
    
    
    if (this.mainSprite.X >= 450) {
        this.mainSprite.X = 450;
    } else if (this.mainSprite.X <= 0) {
        this.mainSprite.X = 0;
    }

    if (this.mainSprite.Y >= 250) {
        this.mainSprite.Y = 250;
    } else if (this.mainSprite.Y <= 0) {
        this.mainSprite.Y = 0;
    }
}

Enjine.TestState.prototype.Draw = function(context) {
    this.drawManager.Draw(context, this.camera)
}

Enjine.TestState.prototype.SetupAnimatedSprite = function() {
        
    this.mainSprite = new Enjine.AnimatedSprite();
    this.mainSprite.Image = img;
    this.mainSprite.SetColumnCount(12);
    this.mainSprite.SetRowCount(1);
    this.mainSprite.AddNewSequence("standing", 0, 0, 0, 0);
    this.mainSprite.AddNewSequence("running", 0, 0, 0, 11);
    this.mainSprite.PlaySequence("standing", false);
    
    this.drawManager.Add(this.mainSprite);
}