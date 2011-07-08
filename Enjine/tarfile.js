//provides me with an easy way to replace only certain modules when I want to reminify it

// core.js
// drawable.js
// vector2.js
// camera.js
// keyboard.js
// gameTimer.js
// gameCanvas.js
// mouse.js
// drawableManager.js
// resources.js
// sprite.js
// frameSprite.js
// animatedSprite.js
// spriteFont.js
// state.js
// collideable.js
// application.js

/*******************
core.js
*******************/

var $e = {};

/*******************
drawable.js
*******************/

$e.Drawable = function() {
    this.zOrder = 0;
};

$e.Drawable.prototype = {
    draw: function(context) { }
};

/*******************
vector2.js
*******************/

$e.Vector2 = function(x, y) {
	this.x = x;
	this.y = y;
};

$e.Vector2.prototype = {
	equals: function(vec) {
		return (this.x === vec.x && this.y === vec.y);
	},

	dot: function(vec) {
		return this.x * vec.x + this.y * vec.y;
	},

	len: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	
	normalize: function() {
		//same as len(), but quicker to calculate it here and save function call overhead
		var len = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= len;
		this.y /= len;
		return this;
	},
	
	add: function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	},
	
	sub: function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	},
	
	scale: function(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	},
	
	mul: function(vec) {
		this.x *= vec.x;
		this.y *= vec.y;
		return this;
	},
	
	div: function(vec) {
		this.x /= vec.x;
		this.y /= vec.y;
		return this;
	}
};

//Static variables and functions
$e.Vector2.zero = new $e.Vector2(0, 0);
$e.Vector2.one = new $e.Vector2(1, 1);
$e.Vector2.unitX = new $e.Vector2(1, 0);
$e.Vector2.unitY = new $e.Vector2(0, 1);

$e.Vector2.dot = function(v1, v2) {
	return v1.x * v2.x + v1.y * v2.y;
};

$e.Vector2.len = function(vec) {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
};

$e.Vector2.add = function(v1, v2) {
	return new $e.Vector2(v1.x + v2.x, v1.y + v2.y);
};

$e.Vector2.sub = function(v1, v2) {
	return new $e.Vector2(v1.x - v2.x, v1.y - v2.y);
};

$e.Vector2.scale = function(vec, scalar) {
	return new $e.Vector2(vec.x * scalar, vec.y * scalar);
};

$e.Vector2.mul = function(v1, v2) {
	return new $e.Vector2(v1.x * v2.x, v1.y * v2.y);
};

$e.Vector2.div = function(v1, v2) {
	return new $e.Vector2(v1.x / v2.x, v1.y / v2.y);
};

/*******************
camera.js
*******************/

$e.Camera = function() {
	this.x = 0;
	this.y = 0;
};

/*******************
keyboard.js
*******************/

$e.Keys = {
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 80,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

$e.Keyboard = {
    pressed: [],
    
    initialize: function() {
        var self = this;
        document.onkeydown = function(event) { self.keyDownEvent(event); };
        document.onkeyup = function(event) { self.keyUpEvent(event); };
    },
    
    isKeyDown: function(key) {
        if (this.pressed[key] !== null) {
            return this.pressed[key];
		}
        return false;
    },
    
    keyDownEvent: function(event) {
        this.pressed[event.keyCode] = true;
    },
    
    keyUpEvent: function(event) {
        this.pressed[event.keyCode] = false;
    }
};

/*******************
gameTimer.js
*******************/

$e.GameTimer = function() {
    this.framesPerSecond = 1000 / 30;
	this.lastTime = 0;
    this.intervalFunc = null;
    this.updateObject = null;
};

$e.GameTimer.prototype = {
    start: function() {
        var self = this;
        this.lastTime = new Date().getTime();
        this.intervalFunc = setInterval(function() { self.tick(); }, this.framesPerSecond);
    },
    
    tick: function() {
        var newTime = new Date().getTime(),
			delta = (newTime - this.lastTime) / 1000;
		
        if (this.updateObject !== null) {
			this.lastTime = newTime;
            this.updateObject.update(delta);
        }
    },
    
    stop: function() {
        clearInterval(this.intervalFunc);
    }
};

/*******************
gameCanvas.js
*******************/

$e.GameCanvas = function() {
	this.canvas = null;
	this.context2D = null;
    this.backBuffer = null;
	this.backBufferContext2D = null;
	this.betterBuffer = null;
	this.autoResolutionMode = false;
	return this;
};

$e.GameCanvas.prototype = {
    initialize: function(canvasId, resWidth, resHeight) {
		this.canvas = document.getElementById(canvasId);
		this.context2D = this.canvas.getContext("2d");
		this.backBuffer = document.createElement("canvas");
		this.backBuffer.width = resWidth;
		this.backBuffer.height = resHeight;
		this.backBufferContext2D = this.backBuffer.getContext("2d");
		this.betterBuffer = this.backBufferContext2D;
		this.betterBuffer.width = this.backBuffer.width;
		this.betterBuffer.height = this.backBuffer.height;
		return this;
	},
	
    beginDraw: function() {
        this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    endDraw: function() {
        this.context2D.drawImage(this.backBuffer, 0, 0, this.backBuffer.width, this.backBuffer.height, 0, 0, this.canvas.width, this.canvas.height);
    },
	
	fullScreen: function(autoRes) {
		this.autoResolutionMode = autoRes;
		this.changeCanvasSize(window.innerWidth, window.innerHeight);
		var self = this;
		window.onresize = function() {
			document.body.style.margin = "0";
			document.body.style.padding = "0";
			self.canvas.width = window.innerWidth;
			self.canvas.height = window.innerHeight;
			if (self.autoResolutionMode) {
				self.backBuffer.width = self.canvas.width;
				self.backBuffer.height = self.canvas.height;
				self.betterBuffer.width = self.backBuffer.width;
				self.betterBuffer.height = self.backBuffer.height;
			}
		};
	},
	
	changeCanvasResolution: function(resWidth, resHeight) {
		this.autoResolutionMode = false;
		this.backBuffer.width = resWidth;
		this.backBuffer.height = resHeight;
		this.betterBuffer.width = this.backBuffer.width;
		this.betterBuffer.height = this.backBuffer.height;
	},
	
	changeCanvasSize: function(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
		window.onresize = null;
		if (this.autoResolutionMode) {
			this.backBuffer.width = this.canvas.width;
			this.backBuffer.height = this.canvas.height;
			this.betterBuffer.width = this.backBuffer.width;
			this.betterBuffer.height = this.backBuffer.height;
		}
	}
};

/*******************
mouse.js
*******************/

$e.Buttons = {
    MouseLeft: 0,
	MouseRight: 2,
	MouseWheel: 1
};

$e.Mouse = {
	x: 0,
	y: 0,
    pressed: [],
	element: null,
	containsMouse: false,
    
    initialize: function(element) {
        var self = this;
		this.element = element;
        element.onmousedown = function(event) { self.pressed[event.button] = true; };
        element.onmouseup = function(event) { self.pressed[event.button] = false };
		element.onmousemove = function(event) { self.mouseMoveEvent(event); };
		element.onmouseover = function(event) { self.containsMouse = true; };
		element.onmouseout = function(event) { self.containsMouse = false; this.x = -1; this.y = -1; };
    },
    
    isButtonDown: function(key) {
        if (this.pressed[key] !== null) {
            return this.pressed[key];
		}
        return false;
    },
	
	mouseMoveEvent: function(event) {
		this.x = event.pageX;
		this.y = event.pageY;
		
		var obj = this.element;
		if (obj.offsetParent) {
			do {
				this.x -= obj.offsetLeft;
				this.y -= obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
	}
};

/*******************
drawableManager.js
*******************/

$e.DrawableManager = function() {
	this.unsorted = true;
	this.objects = [];
};

$e.DrawableManager.prototype = {
    add: function(object) {
		this.objects.push(object);
		this.unsorted = true;
		return this;
	},
	
	addRange: function(objects) {
		this.objects = this.objects.concat(objects);
		this.unsorted = true;
		return this;
	},
	
	clear: function() {
		this.objects.splice(0, this.objects.length);
		return this;
	},
    
    contains: function(obj) {
        var i = this.objects.length;
        while (i--) {
            if (this.objects[i] === obj) {
                return true;
            }
        }
        return false;
    },
	
	remove: function(object) {
		var index = this.objects.indexOf(object);
		this.objects.splice(index, 1);
		return this;
	},
	
	removeAt: function(index) {
		this.objects.splice(index, 1);
		return this;
	},
	
	removeRange: function(index, len) {
		this.objects.splice(index, len);
		return this;
	},
    
    removeList: function(items) {
        var i = 0,
			j = 0;
		
        for (j = 0; j < items.length; i++) {
            for (i = 0; i < this.objects.length; i++) {
                if (this.objects[i] === items[j]) {
                    this.objects.splice(i, 1);
                    items.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
		
		return this;
    },
	
	update: function(delta) {
        var i = 0;
		for (i = 0; i < this.objects.length; i++) {
			if (this.objects[i].update) {
				this.objects[i].update(delta);
			}
		}
	},
	
	draw: function(context, camera) {
        var i = 0;
		
		//sort the sprites based on their 'z depth' to get the correct drawing order
		if (this.unsorted) {
			this.unsorted = false;
			this.objects.sort(function(x1,x2) { return x1.zOrder - x2.zOrder; });
		}
		
		for (i = 0; i < this.objects.length; i++) {
			if (this.objects[i].draw) {
				this.objects[i].draw(context, camera);
            }
		}
	}
};

/*******************
resources.js
*******************/

$e.Resources = {
    images: {},
    sounds: {},

    destroy: function() {
        delete this.images;
        delete this.sounds;
        return this;
    },
    
    //***********************/
    //images
    addImage: function(name, src) {
        var tempImage = new Image();
		this.images[name] = tempImage;
        tempImage.src = src;
        return this;
	},
	
	addImages: function(array) {
		var i = 0,
			tempImage = null;
		
		for (i = 0; i < array.length; i++) {
            tempImage = new Image();
            this.images[array[i].name] = tempImage;
            tempImage.src = array[i].src;
        }
        return this;
	},
	
	clearImages: function() {
		delete this.images;
        this.images = {};
        return this;
	},
	
	removeImage: function(name) {
		delete this.images[name];
		return this;
	},
    
    //***********************/
    //sounds
    addSound: function(name, src, maxChannels) {
		var i = 0;
        this.sounds[name] = [];
        this.sounds[name].index = 0;
        if (!maxChannels) {
			maxChannels = 3;
        }
        for (i = 0; i < maxChannels; i++) {
			this.sounds[name][i] = new Audio(src);
        }
        return this;
    },
    
    clearSounds: function() {
        delete this.sounds;
        this.sounds = {};
        return this;
    },
    
    removeSound: function(name) {
        delete this.sounds[name];
        return this;
    },
    
    playSound: function(name, loop) {
		if (this.sounds[name].index >= this.sounds[name].length) {
			this.sounds[name].index = 0;
		}
		if (loop) {
			this.sounds[name][this.sounds[name].index].addEventListener("ended", this.loopCallback, false);
		}
		this.sounds[name][this.sounds[name].index++].play();
		return this.sounds[name].index;
    },
    
    pauseChannel: function(name, index) {
		if (!this.sounds[name][index].paused) {
			this.sounds[name][index].pause();
		}
		return this;
    },
    
    pauseSound: function(name) {
		var i = 0;
		for (i = 0; i < this.sounds[name].length; i++) {
			if (!this.sounds[name][i].paused) {
				this.sounds[name][i].pause();
			}
		}
		return this;
    },
    
    resetChannel: function(name, index) {
		this.sounds[name][index].currentTime = 0;
		this.stopLoop(name, index);
		return this;
    },
    
    resetSound: function(name) {
		var i = 0;
		for (i = 0; i < this.sounds[name].length; i++) {
			this.sounds[name].currentTime = 0;
			this.stopLoop(name, i);
		}
		return this;
    },
    
    stopLoop: function(name, index) {
		this.sounds[name][index].removeEventListener("ended", this.loopCallback, false);	
    },
    
    loopCallback: function() {
		this.currentTime = -1;
		this.play();
    }
};

/*******************
sprite.js
*******************/

$e.Sprite = function() {
	this.x = 0;
	this.y = 0;
	this.xPivot = 0.5;
	this.yPivot = 0.5;
	this.angle = 0;
	this.xScale = 1;
	this.yScale = 1;
	this.image = null;
};

$e.Sprite.prototype = new $e.Drawable();

$e.Sprite.prototype.draw = function(context, camera) {
	context.save();
	context.translate(this.x - camera.x, this.y - camera.y);
	context.rotate(this.angle);
	context.scale(this.xScale, this.yScale);
	context.drawImage(this.image, -this.image.width * this.xPivot, -this.image.height * this.yPivot);
	context.restore();
};

/*******************
frameSprite.js
*******************/

$e.FrameSprite = function() {
    this.frameX = 0;
    this.frameY = 0;
	this.frameWidth = 0;
    this.frameHeight = 0;
};

$e.FrameSprite.prototype = new $e.Sprite();

$e.FrameSprite.prototype.draw = function(context, camera) {
	context.save();
	context.translate(this.x - camera.x, this.y - camera.y);
	context.rotate(this.angle);
	context.scale(this.xScale, this.yScale);
    context.drawImage(this.image, this.frameX, this.frameY, this.frameWidth, this.frameHeight, -this.frameWidth * this.xPivot, -this.frameHeight * this.yPivot, this.frameWidth, this.frameHeight);
	context.restore();
};

/*******************
animatedSprite.js
*******************/

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
	return this;
};

$e.AnimatedSprite.prototype.stopLooping = function() {
    this.looping = false;
	return this;
};

$e.AnimatedSprite.prototype.stopPlaying = function() {
    this.playing = false;
	return this;
};

$e.AnimatedSprite.prototype.setFrameWidth = function(width) {
    this.frameWidth = width;
	return this;
};

$e.AnimatedSprite.prototype.setFrameHeight = function(height) {
    this.frameHeight = height;
	return this;
};

$e.AnimatedSprite.prototype.setColumnCount = function(columnCount) {
    this.frameWidth = this.image.width / columnCount;
	return this;
};

$e.AnimatedSprite.prototype.setRowCount = function(rowCount) {
    this.frameHeight = this.image.height / rowCount;
	return this;
};

$e.AnimatedSprite.prototype.addSequence = function(name, sequence) {
    this.sequences["seq_" + name] = sequence;
	return this;
};

$e.AnimatedSprite.prototype.addNewSequence = function(name, startRow, startColumn, endRow, endColumn) {
    this.sequences["seq_" + name] = new $e.AnimationSequence(startRow, startColumn, endRow, endColumn);
	return this;
};

$e.AnimatedSprite.prototype.deleteSequence = function(name) {
    if (this.sequences["seq_" + name]  !== null) {
        delete this.sequences["seq_" + name];
    }
	return this;
};

$e.AnimatedSprite.prototype.clearSequences = function() {
    delete this.sequences;
    this.sequences = {};
	return this;
};

/*******************
spriteFont.js
*******************/

$e.SpriteFont = function(image, letterWidth, letterHeight, letters) {
    this.image = image;
    this.letters = letters;
    this.letterWidth = letterWidth;
    this.letterHeight = letterHeight;
	this.letterSpacing = 0;
	this.lineHeight = 0;
    this.strings = [];
};

$e.SpriteFont.prototype = new $e.Drawable();

$e.SpriteFont.prototype.addString = function(str, xPos, yPos) {
	var strObj = { string: str, x: xPos, y: yPos };
	this.strings.push(strObj);
	return this;
};

$e.SpriteFont.prototype.removeString = function(index) {
	this.strings.splice(index, 1);
	return this;
};

$e.SpriteFont.prototype.draw = function(context, camera) {
	var code = 0,
		i = 0,
		str = null,
		s = 0,
		x = 0,
		y = 0;
	
    for (s = 0; s < this.strings.length; s++) {
        str = this.strings[s];
		x = str.x;
		y = str.y;
		
        for (i = 0; i < str.string.length; i++) {
            code = str.string.charCodeAt(i);
			
			if (code === 10) {
				//handle line break
				y += this.letterHeight + this.lineSpacing;
				x = str.x;
			} else {
				context.drawImage(this.image, this.letters[code].x, this.letters[code].y, this.letterWidth, this.letterHeight, x - camera.x, y - camera.y, this.letterWidth, this.letterHeight);
				x += this.letterWidth + this.letterSpacing;
			}
		}
    }
};

/*******************
state.js
*******************/

$e.GameStateContext = function(defaultState) {
    this.state = null;
    
    if (defaultState !== null) {
        this.state = defaultState;
        this.state.enter();
    }
};

$e.GameStateContext.prototype = {
    changeState: function(newState) {
        if (this.state !== null) {
            this.state.exit();
        }
        this.state = newState;
        this.state.enter();
    },
    
    update: function(delta) {
        this.state.checkForChange(this);
        this.state.update(delta);
    },
    
    draw: function(delta) {
        this.state.draw(delta);
    }
};

$e.GameState = function() { };

$e.GameState.prototype = {
    enter: function () {},
    exit: function() {},
    update: function(delta) {},
    draw: function(context) {},
    checkForChange: function(context) {}
};

/*******************
collideable.js
*******************/

$e.Collideable = function(obj, width, height, collisionEvent) {
    this.base = obj;
    this.x = obj.x;
    this.y = obj.y;
    this.width = width;
    this.height = height;
    
    if (collisionEvent !== null) {
        this.collisionEvent = collisionEvent;
    } else {
        this.collisionEvent = function() {};
    }
};

$e.Collideable.prototype = {
    update: function() {
        this.x = this.base.x;
        this.y = this.base.y;
    },
    
    checkCollision: function(other) {
        if (this.y + this.height < other.y) {
            return;
        }
        if (this.y > other.y + other.height) {
            return;
        }
        if (this.x + this.width < other.x) {
            return;
        }
        if (this.x > other.x + other.width) {
            return;
        }
        
        //collision, fire the events!
        this.collisionEvent(other);
        other.collisionEvent(this);
    }
};

/*******************
application.js
*******************/

$e.Application = function() {
    this.canvas = null;
    this.timer = null;
    this.stateContext = null;
};

$e.Application.prototype = {
    update: function(delta) {
        
        this.stateContext.update(delta);
        
        this.canvas.beginDraw();
        
        this.stateContext.draw(this.canvas.betterBuffer);
        
        this.canvas.endDraw();
    },
    
    initialize: function(canvasId, defaultState, resWidth, resHeight) {
        this.canvas = new $e.GameCanvas();
        this.timer = new $e.GameTimer();
        $e.Keyboard.initialize();
		$e.Mouse.initialize(document.getElementById(canvasId));
        this.canvas.initialize(canvasId, resWidth, resHeight);
        this.timer.updateObject = this;
        
        this.stateContext = new $e.GameStateContext(defaultState);
        
        this.timer.start();
    }
};