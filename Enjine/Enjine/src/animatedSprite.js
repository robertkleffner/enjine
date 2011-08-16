(function() {
  /*
  	Class to represent an uninterrupted set of frames to animate.
  	Code by Rob Kleffner, 2011
  */
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.module("Enjine", function() {
    var AnimationSequence;
    return AnimationSequence = (function() {
      function AnimationSequence(startRow, startColumn, endRow, endColumn) {
        this.startRow = startRow;
        this.startColumn = startColumn;
        this.endRow = endRow;
        this.endColumn = endColumn;
        this.singleFrame = false;
        if (this.startRow === this.endRow && this.startColumn === this.endColumn) {
          this.singleFrame = true;
        }
      }
      return AnimationSequence;
    })();
  });
  this.module("Enjine", function() {
    var AnimatedSprite;
    return AnimatedSprite = (function() {
      __extends(AnimatedSprite, FrameSprite);
      function AnimatedSprite() {
        AnimatedSprite.__super__.constructor.apply(this, arguments);
      }
      AnimatedSprite.prototype.lastElapsed = 0;
      AnimatedSprite.prototype.framesPerSecond = 1 / 20;
      AnimatedSprite.prototype.currentSequence = null;
      AnimatedSprite.prototype.playing = false;
      AnimatedSprite.prototype.looping = false;
      AnimatedSprite.prototype.sequences = {};
      AnimatedSprite.prototype.update = function(delta) {
        var seqEnd;
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
        if (this.frameX > (this.image.width - this.frameWidth)) {
          this.frameX = 0;
          this.frameY += this.frameHeight;
          if (this.frameY > (this.image.height - this.frameHeight)) {
            this.frameY = 0;
          }
        }
        if (this.frameX > (this.currentSequence.endColumn * this.frameWidth) && this.frameY === (this.currentSequence.endRow * this.frameHeight)) {
          seqEnd = true;
        } else if (this.frameX === 0 && this.frameY > (this.currentSequence.endRow * this.frameHeight)) {
          seqEnd = true;
        }
        if (seqEnd) {
          if (this.looping) {
            this.frameX = this.currentSequence.startColumn * this.frameWidth;
            return this.frameY = this.currentSequence.startRow * this.frameHeight;
          } else {
            return this.playing = false;
          }
        }
      };
      AnimatedSprite.prototype.playSequence = function(seqName, doLoop) {
        this.playing = true;
        this.looping = doLoop;
        this.currentSequence = this.sequences["seq_" + seqName];
        this.frameX = this.currentSequence.startColumn * this.frameWidth;
        this.frameY = this.currentSequence.startRow * this.frameHeight;
        return this;
      };
      AnimatedSprite.prototype.stopLooping = function() {
        this.looping = false;
        return this;
      };
      AnimatedSprite.prototype.stopPlaying = function() {
        this.playing = false;
        return this;
      };
      AnimatedSprite.prototype.setFrameWidth = function(width) {
        this.frameWidth = width;
        return this;
      };
      AnimatedSprite.prototype.setFrameHeight = function(height) {
        this.frameHeight = height;
        return this;
      };
      AnimatedSprite.prototype.setColumnCount = function(columnCount) {
        this.frameWidth = this.image.width / columnCount;
        return this;
      };
      AnimatedSprite.prototype.setRowCount = function(rowCount) {
        this.frameHeight = this.image.height / rowCount;
        return this;
      };
      AnimatedSprite.prototype.addSequence = function(name, sequence) {
        this.sequences["seq_" + name] = sequence;
        return this;
      };
      AnimatedSprite.prototype.addNewSequence = function(name, startRow, startColumn, endRow, endColumn) {
        this.sequences["seq_" + name] = new Enjine.AnimationSequence(startRow, startColumn, endRow, endColumn);
        return this;
      };
      AnimatedSprite.prototype.deleteSequence = function(name) {
        delete this.sequences["seq_" + name];
        return this;
      };
      AnimatedSprite.prototype.clearSequences = function() {
        delete this.sequences;
        this.sequences = {};
        return this;
      };
      return AnimatedSprite;
    })();
  });
}).call(this);
