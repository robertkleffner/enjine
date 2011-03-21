/**
	Class to help manage and draw a collection of sprites.
	Code by Rob Kleffner, 2011
*/

Enjine.SpriteManager = function() {
	var unsorted = true;
	this.Sprites = new Array();
}

Enjine.SpriteManager.prototype = {
    Add: function(sprite) {
		this.Sprites.push(sprite);
		unsorted = true;
	},
	
	AddRange: function(sprites) {
		this.Sprites = this.Sprites.concat(sprites);
		unsorted = true;
	},
	
	Clear: function() {
		this.Sprites.splice(0, this.Sprites.length);
	},
	
	Remove: function(sprite) {
		var index = this.Sprites.indexOf(sprite);
		this.Sprites.splice(index, 1);
	},
	
	RemoveAt: function(index) {
		this.Sprites.splice(index, 1);
	},
	
	RemoveRange: function(index, length) {
		this.Sprites.splice(index, length);
	},
	
	Update: function(delta) {
		for (i in this.Sprites) {
			if (this.Sprites[i].Update) {
				this.Sprites[i].Update(delta);
			}
		}
	},
	
	Draw: function(context, camera) {
		
		//sort the sprites based on their 'z depth' to get the correct drawing order
		if (unsorted) {
			unsorted = false;
			this.Sprites.sort(function(x1,x2) { return x1.ZOrder - x2.ZOrder; });
		}
		
		for (i in this.Sprites) {
			if (this.Sprites[i].Draw) {
				this.Sprites[i].Draw(context, camera);
			}
		}
	}
}