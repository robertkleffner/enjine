/**
	Base class to represent a double buffered canvas object.
	Code by Rob Kleffner, 2011
*/

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