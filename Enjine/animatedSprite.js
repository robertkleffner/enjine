/**
    Class to represent an uninterrupted set of frames to animate.
*/ 

$e.AnimationSequence = function(startRow, startColumn, endRow, endColumn) {
    this.startRow = startRow;
    this.startColumn = startColumn;
    this.endRow = endRow;
    this.endColumn = endColumn;
    
    //sometimes in an animated sprite, we want it to behave like a regular sprite (static)
    //this variable will keep it from wasting time updating animation when the sequence
    //is only a single frame long, for things like standing or pausing action
    this.singleFrame = false;
    
    if ((this.startRow === this.endRow) && (this.startColumn === this.endColumn)) {
        this.singleFrame = true;
    }
};

/**
	Subclass that extends the frame sprite with animation capability.
	Code by Rob Kleffner, 2011
*/

$e.AnimatedSprite = function() {
    this.lastElapsed = 0;
    this.framesPerSecond = 1 / 20;
    this.currentSequence = null;
    this.playing = false;
    this.looping = false;
    
    //cheesy dictionary hack to make animation sequences more accessible
    this.sequences = {};
};

$e.AnimatedSprite.prototype = new $e.FrameSprite();

$e.AnimatedSprite.prototype.update = function(delta) {
    var seqEnd = false;

    if (this.currentSequence.singleFrame) {
        return;
    }
    if (!this.playing) {
        return;
    }

    this.lastElapsed -= delta;
    
    if (this.lastElapsed > 0) {
        return;
    }
    
    this.lastElapsed = this.framesPerSecond;
    this.frameX += this.frameWidth;
    
    //increment the frame
    if (this.frameX > (this.image.width - this.frameWidth)) {
        this.frameX = 0;
        this.frameY += this.frameHeight;
        
        if (this.frameY > (this.image.height - this.frameHeight)) {
            this.frameY = 0;
        }
    }
    
    //check if it's at the end of the animation sequence
    if ((this.frameX > (this.currentSequence.endColumn * this.frameWidth)) && (this.frameY === (this.currentSequence.endRow * this.frameHeight))) {
        seqEnd = true;
    } else if (this.frameX === 0 && (this.frameY > (this.currentSequence.endRow * this.frameHeight))) {
        seqEnd = true;
    }
    
    //go back to the beginning if looping, otherwise stop playing
    if (seqEnd) {
        if (this.looping) {
            this.frameX = this.currentSequence.startColumn * this.frameWidth;
            this.frameY = this.currentSequence.startRow * this.frameHeight;
        } else {
            this.playing = false;
        }
    }
};

$e.AnimatedSprite.prototype.playSequence = function(seqName, loop) {
    this.playing = true;
    this.looping = loop;
    this.currentSequence = this.sequences["seq_" + seqName];
    this.frameX = this.currentSequence.startColumn * this.frameWidth;
    this.frameY = this.currentSequence.startRow * this.frameHeight;
};

$e.AnimatedSprite.prototype.stopLooping = function() {
    this.looping = false;
};

$e.AnimatedSprite.prototype.stopPlaying = function() {
    this.playing = false;
};

$e.AnimatedSprite.prototype.setFrameWidth = function(width) {
    this.frameWidth = width;
};

$e.AnimatedSprite.prototype.setFrameHeight = function(height) {
    this.frameHeight = height;
};

$e.AnimatedSprite.prototype.setColumnCount = function(columnCount) {
    this.frameWidth = this.image.width / columnCount;
};

$e.AnimatedSprite.prototype.setRowCount = function(rowCount) {
    this.frameHeight = this.image.height / rowCount;
};

$e.AnimatedSprite.prototype.addExistingSequence = function(name, sequence) {
    this.sequences["seq_" + name] = sequence;
};

$e.AnimatedSprite.prototype.addNewSequence = function(name, startRow, startColumn, endRow, endColumn) {
    this.sequences["seq_" + name] = new $e.AnimationSequence(startRow, startColumn, endRow, endColumn);
};

$e.AnimatedSprite.prototype.deleteSequence = function(name) {
    if (this.sequences["seq_" + name]  != null) {
        delete this.sequences["seq_" + name];
    }
};

$e.AnimatedSprite.prototype.clearSequences = function() {
    delete this.sequences;
    this.sequences = {};
};