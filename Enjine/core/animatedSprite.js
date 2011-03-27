/**
	Subclass that extends the regular sprite with animation capability.
	Code by Rob Kleffner, 2011
*/

Enjine.AnimationSequence = function(startRow, startColumn, endRow, endColumn) {
    this.StartRow = startRow;
    this.StartColumn = startColumn;
    this.EndRow = endRow;
    this.EndColumn = endColumn;
    
    //sometimes in an animated sprite, we want it to behave like a regular sprite (static)
    //this variable will keep it from wasting time updating animation when the sequence
    //is only a single frame long, for things like standing or pausing action
    this.SingleFrame = false;
    
    if ((this.StartRow == this.EndRow) && (this.StartColumn == this.EndColumn)) {
        this.SingleFrame = true;
    }
}

Enjine.AnimatedSprite = function() {
    var currentFrameX = 0;
    var currentFrameY = 0;
    var lastElapsed;
    this.FramesPerSecond = 0;
    this.FrameWidth = 0;
    this.FrameHeight = 0;
    var currentSequence = null;
    var playing = false;
    var looping = false;
    var rows = 0;
    var columns = 0;
    
    //cheesy dictionary hack to make animation sequences more accessible
    var sequences = new Object();
}

Enjine.AnimatedSprite.prototype = new Enjine.Sprite();

Enjine.AnimatedSprite.prototype.Update = function(delta) {
    if (currentSequence.SingleFrame) {
        return;
    }
    if (!playing) {
        return;
    }

    lastElapsed -= delta;
    
    if (lastElapsed > 0) {
        return;
    }
    
    lastElapsed = this.FramesPerSecond;
    currentFrameX += this.FrameWidth;
    
    //increment the frame
    if (currentFrameX > (this.Image.width - this.FrameWidth)) {
        currentFrameX = 0;
        currentFrameY += this.FrameHeight;
        
        if (currentFrameY > (this.Image.height - this.FrameHeight)) {
            currentFrameY = 0;
        }
    }
    
    //check if it's at the end of the animation sequence
    var seqEnd = false;
    if ((currentFrameX > (currentSequence.EndColumn * this.FrameWidth)) && (currentFrameY == (currentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    } else if (currentFrameX == 0 && (currentFrameY > (currentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    }
    
    //go back to the beginning if looping, otherwise stop playing
    if (seqEnd) {
        if (looping) {
            currentFrameX = currentSequence.StartColumn * this.FrameWidth;
            currentFrameY = currentSequence.StartRow * this.FrameHeight;
        } else {
            playing = false;
        }
    }
}

Enjine.AnimatedSprite.prototype.Draw = function(context, camera) {
    context.drawImage(this.Image, currentFrameX, currentFrameY, this.FrameWidth, this.FrameHeight, this.X - camera.X, this.Y - camera.Y, this.FrameWidth, this.FrameHeight);
}

Enjine.AnimatedSprite.prototype.PlaySequence = function(seqName, loop) {
    playing = true;
    looping = loop;
    currentSequence = sequences["seq_" + seqName];
    currentFrameX = currentSequence.StartColumn;
    currentFrameY = currentSequence.StartRow;
}

Enjine.AnimatedSprite.prototype.StopLooping = function() {
    looping = false;
}

Enjine.AnimatedSprite.prototype.StopPlaying = function() {
    playing = false;
}

Enjine.AnimatedSprite.prototype.SetFrameWidth = function(width) {
    this.FrameWidth = width;
    rows = this.Image.width / this.FrameWidth;
}

Enjine.AnimatedSprite.prototype.SetFrameHeight = function(height) {
    this.FrameHeight = height;
    columns = this.Image.height / this.FrameHeight;
}

Enjine.AnimatedSprite.prototype.SetColumnCount = function(columnCount) {
    this.FrameWidth = this.Image.width / columnCount;
    columns = columnCount;
}

Enjine.AnimatedSprite.prototype.SetRowCount = function(rowCount) {
    this.FrameHeight = this.Image.height / rowCount;
    rows = rowCount;
}

Enjine.AnimatedSprite.prototype.AddExistingSequence = function(name, sequence) {
    sequences["seq_" + name] = sequence;
}

Enjine.AnimatedSprite.prototype.AddNewSequence = function(name, startRow, startColumn, endRow, endColumn) {
    sequences["seq_" + name] = new AnimationSequence(startRow, startColumn, endRow, endColumn);
}

Enjine.AnimatedSprite.prototype.DeleteSequence = function(name) {
    if (sequences["seq_" + name]  != null) {
        delete sequences["seq_" + name];
    }
}

Enjine.AnimatedSprite.prototype.ClearSequences = function() {
    delete sequences;
}