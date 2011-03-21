/**
	Base class to represent a double buffered canvas object.
	Code by Rob Kleffner, 2011
*/

Enjine.GameCanvas = function() {
	this.Canvas = null;
	this.Context2D = null;
	var backBuffer = null;
	this.BackBufferContext2D = null;
}

Enjine.GameCanvas.prototype = {
    Initialize: function(canvasId) {
		this.Canvas = document.getElementById(canvasId);
		this.Context2D = this.Canvas.getContext("2d");
		backBuffer = document.createElement("canvas");
		backBuffer.width = this.Canvas.width;
		backBuffer.height = this.Canvas.height;
		this.BackBufferContext2D = backBuffer.getContext("2d");
	},
	
    BeginDraw: function() {
        this.BackBufferContext2D.clearRect(0, 0, backBuffer.width, backBuffer.height);
        this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    },
    
    EndDraw: function() {
        this.Context2D.drawImage(backBuffer, 0, 0);
    }
}