/**
	Base class for all drawable objects, makes ordering automatic.
	Code by Rob Kleffner, 2011
*/

$e.Drawable = function() {
    this.zOrder = 0;
}

$e.Drawable.prototype = {
    draw: function(context) { }
}