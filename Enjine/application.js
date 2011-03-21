/**
	Simple demo of the engine.
	Code by Rob Kleffner, 2011
*/

var img = new Image();
img.src = "http://javascript-tutorials.googlecode.com/files/jsplatformer1-smiley.jpg";

Enjine.Application = function() {
    this.canvas = null;
    this.timer = null;
    this.spriteManager = null;
    this.mainSprite = null;
    this.xDirection = 1;
    this.yDirection = 1;
    this.camera = null;
}

Enjine.Application.prototype = {
    Update: function(delta) {
        
        this.spriteManager.Update(delta);
        
        this.mainSprite.X += delta * 50 * this.xDirection;
        this.mainSprite.Y += delta * 50 * this.yDirection;
        
        
        if (this.mainSprite.X >= 450)
        {
            this.mainSprite.X = 450;
            this.xDirection = -1;
        }
        else if (this.mainSprite.X <= 0)
        {
            this.mainSprite.X = 0;
            this.xDirection = 1;
        }

        if (this.mainSprite.Y >= 250)
        {
            this.mainSprite.Y = 250;
            this.yDirection = -1;
        }
        else if (this.mainSprite.Y <= 0)
        {
            this.mainSprite.Y = 0;
            this.yDirection = 1;
        }
       
        this.canvas.BeginDraw();
        
        this.spriteManager.Draw(this.canvas.BackBufferContext2D, this.camera);
        
        this.canvas.EndDraw();
    },
    
    Initialize: function() {
        this.canvas = new Enjine.GameCanvas();
        this.timer = new Enjine.GameTimer();
        this.spriteManager = new Enjine.SpriteManager();
        this.camera = new Enjine.Camera();
        
        this.canvas.Initialize("canvas");
        this.timer.UpdateObject = this;
        
        this.mainSprite = new Enjine.Sprite();
        this.mainSprite.Image = img;
        this.spriteManager.Add(this.mainSprite);
        
        this.timer.Start();
    }
}

var app = new Enjine.Application();
app.Initialize();