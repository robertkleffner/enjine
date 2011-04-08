/**
	Represents a simple static sprite.
	Code by Rob Kleffner, 2011
*/

Enjine.Resources = {
    Images: new Object(),
    Sounds: new Object(),

    Destroy: function() {
        delete this.Images;
        delete this.Sounds;
    },
    
    //***********************
    //Images
    AddImage: function(name, src) {
        var tempImage = new Image();
		this.Images[name] = tempImage;
        tempImage.src = src;
	},
	
	AddImages: function(array) {
		for (var i = 0; i < array.length; i++) {
            var tempImage = new Image();
            this.Images[array[i].name] = tempImage;
            tempImage.src = array[i].src;
        }
	},
	
	ClearImages: function() {
		delete this.Images;
        this.Images = new Object();
	},
	
	RemoveImage: function(name) {
		delete this.Images[name];
	},
    
    //***********************
    //Sounds
    AddSound: function(name, src) {
        this.Sounds[name] = new Audio(src);
    },
    
    AddSounds: function(array) {
        for (var i = 0; i < array.length; i++) {
            var tempSound = new Audio(array[i].src);
            this.Sounds[array[i].name] = tempSound;
        }
    },
    
    ClearSounds: function() {
        delete this.Sounds;
        this.Sounds = new Object();
    },
    
    RemoveSound: function(name) {
        delete this.Sounds[name];
    }
}