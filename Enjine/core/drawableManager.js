/**
	Class to help manage and draw a collection of sprites.
	Code by Rob Kleffner, 2011
*/

Enjine.DrawableManager = function() {
	this.Unsorted = true;
	this.Objects = new Array();
}

Enjine.DrawableManager.prototype = {
    Add: function(object) {
		this.Objects.push(object);
		this.Unsorted = true;
	},
	
	AddRange: function(objects) {
		this.Objects = this.Objects.concat(objects);
		this.Unsorted = true;
	},
	
	Clear: function() {
		this.Objects.splice(0, this.Objects.length);
	},
	
	Remove: function(object) {
		var index = this.Objects.indexOf(object);
		this.Objects.splice(index, 1);
	},
	
	RemoveAt: function(index) {
		this.Objects.splice(index, 1);
	},
	
	RemoveRange: function(index, length) {
		this.Objects.splice(index, length);
	},
	
	Update: function(delta) {
		for (i in this.Objects) {
			if (this.Objects[i].Update) {
				this.Objects[i].Update(delta);
			}
		}
	},
	
	Draw: function(context, camera) {
		
		//sort the sprites based on their 'z depth' to get the correct drawing order
		if (this.Unsorted) {
			this.Unsorted = false;
			this.Objects.sort(function(x1,x2) { return x1.ZOrder - x2.ZOrder; });
		}
		
		for (i in this.Objects) {
			if (this.Objects[i].Draw) {
				this.Objects[i].Draw(context, camera);
			}
		}
	}
}