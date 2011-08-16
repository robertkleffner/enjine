/**
	Class to help manage and draw a collection of sprites.
	Code by Rob Kleffner, 2011
*/

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