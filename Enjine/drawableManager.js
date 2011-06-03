/**
	Class to help manage and draw a collection of sprites.
	Code by Rob Kleffner, 2011
*/

$e.DrawableManager = function() {
	this.Unsorted = true;
	this.Objects = [];
}

$e.DrawableManager.prototype = {
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
    
    Contains: function(obj) {
        var i = this.Objects.length;
        while (i--) {
            if (this.Objects[i] === obj) {
                return true;
            }
        }
        return false;
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
    
    RemoveList: function(items) {
        var i = 0, j = 0;
        for (j = 0; j < items.length; i++) {
            for (i = 0; i < this.Objects.length; i++) {
                if (this.Objects[i] === items[j]) {
                    this.Objects.splice(i, 1);
                    items.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
    },
	
	Update: function(delta) {
        var i = 0;
		for (i = 0; i < this.Objects.length; i++) {
			if (this.Objects[i].Update) {
				this.Objects[i].Update(delta);
			}
		}
	},
	
	draw: function(context, camera) {
		
		//sort the sprites based on their 'z depth' to get the correct drawing order
		if (this.Unsorted) {
			this.Unsorted = false;
			this.Objects.sort(function(x1,x2) { return x1.zOrder - x2.zOrder; });
		}
		
        var i = 0;
		for (i = 0; i < this.Objects.length; i++) {
			if (this.Objects[i].draw) {
				this.Objects[i].draw(context, camera);
            }
		}
	}
}