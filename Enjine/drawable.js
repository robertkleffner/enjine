/**
	Base class for all drawable objects, makes ordering automatic.
	Code by Rob Kleffner, 2011
*/

$e.Drawable = function() {
    this.ZOrder = 0;
}

$e.Drawable.prototype = {
    Draw: function(context) { }
}