/**
	Represents a simple static sprite.
	Code by Rob Kleffner, 2011
*/

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