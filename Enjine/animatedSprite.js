/**
    Class to represent an uninterrupted set of frames to animate.
*/ 

$e.AnimationSequence = function(startRow, startColumn, endRow, endColumn) {
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

/**
	Subclass that extends the regular sprite with animation capability.
	Code by Rob Kleffner, 2011
*/

$e.AnimatedSprite = function() {
    this.LastElapsed = 0;
    this.FramesPerSecond = 1 / 20;
    this.CurrentSequence = null;
    this.Playing = false;
    this.Looping = false;
    this.Rows = 0;
    this.Columns = 0;
    
    //cheesy dictionary hack to make animation sequences more accessible
    this.Sequences = new Object();
}

$e.AnimatedSprite.prototype = new $e.FrameSprite();

$e.AnimatedSprite.prototype.Update = function(delta) {
    if (this.CurrentSequence.SingleFrame) {
        return;
    }
    if (!this.Playing) {
        return;
    }

    this.LastElapsed -= delta;
    
    if (this.LastElapsed > 0) {
        return;
    }
    
    this.LastElapsed = this.FramesPerSecond;
    this.FrameX += this.FrameWidth;
    
    //increment the frame
    if (this.FrameX > (this.image.width - this.FrameWidth)) {
        this.FrameX = 0;
        this.FrameY += this.FrameHeight;
        
        if (this.FrameY > (this.image.height - this.FrameHeight)) {
            this.FrameY = 0;
        }
    }
    
    //check if it's at the end of the animation sequence
    var seqEnd = false;
    if ((this.FrameX > (this.CurrentSequence.EndColumn * this.FrameWidth)) && (this.FrameY == (this.CurrentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    } else if (this.FrameX == 0 && (this.FrameY > (this.CurrentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    }
    
    //go back to the beginning if looping, otherwise stop playing
    if (seqEnd) {
        if (this.Looping) {
            this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
            this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
        } else {
            this.Playing = false;
        }
    }
}

$e.AnimatedSprite.prototype.PlaySequence = function(seqName, loop) {
    this.Playing = true;
    this.Looping = loop;
    this.CurrentSequence = this.Sequences["seq_" + seqName];
    this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
    this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
}

$e.AnimatedSprite.prototype.StopLooping = function() {
    this.Looping = false;
}

$e.AnimatedSprite.prototype.StopPlaying = function() {
    this.Playing = false;
}

$e.AnimatedSprite.prototype.SetFrameWidth = function(width) {
    this.FrameWidth = width;
    this.Rows = this.image.width / this.FrameWidth;
}

$e.AnimatedSprite.prototype.SetFrameHeight = function(height) {
    this.FrameHeight = height;
    this.Columns = this.image.height / this.FrameHeight;
}

$e.AnimatedSprite.prototype.SetColumnCount = function(columnCount) {
    this.FrameWidth = this.image.width / columnCount;
    this.Columns = columnCount;
}

$e.AnimatedSprite.prototype.SetRowCount = function(rowCount) {
    this.FrameHeight = this.image.height / rowCount;
    this.Rows = rowCount;
}

$e.AnimatedSprite.prototype.AddExistingSequence = function(name, sequence) {
    this.Sequences["seq_" + name] = sequence;
}

$e.AnimatedSprite.prototype.AddNewSequence = function(name, startRow, startColumn, endRow, endColumn) {
    this.Sequences["seq_" + name] = new $e.AnimationSequence(startRow, startColumn, endRow, endColumn);
}

$e.AnimatedSprite.prototype.DeleteSequence = function(name) {
    if (this.Sequences["seq_" + name]  != null) {
        delete this.Sequences["seq_" + name];
    }
}

$e.AnimatedSprite.prototype.ClearSequences = function() {
    delete this.Sequences;
    this.Sequences = new Object();
}