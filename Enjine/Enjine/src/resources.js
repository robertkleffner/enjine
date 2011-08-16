(function() {
  this.module("Enjine", function() {
    var Resources;
    return Resources = {
      images: {},
      sounds: {},
      destroy: function() {
        delete this.images;
        delete this.sounds;
        return this;
      },
      addImage: function(name, src) {
        var tempImage;
        tempImage = new Image();
        this.images[name] = tempImage;
        tempImage.src = src;
        return this;
      },
      addImages: function(array) {
        var imgData, tempImage, _i, _len;
        tempImage = null;
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          imgData = array[_i];
          tempImage = new Image();
          this.images[imgData.name] = tempImage;
          tempImage.src = imgData.src;
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
      addSound: function(name, src, maxChannels) {
        var i;
        this.sounds[name] = [];
        this.sounds[name].index = 0;
        if (!maxChannels) {
          maxChannels = 3;
        }
        i = 0;
        while (i < maxChannels) {
          this.sounds[name][i] = new Audio(src);
          i++;
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
      pauseChannel: function(name, index) {
        if (!this.sounds[name][index].paused) {
          this.sounds[name][index].pause();
        }
        return this;
      },
      pauseSound: function(name) {
        var channel, _i, _len, _ref;
        _ref = this.sounds[name];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          channel = _ref[_i];
          if (!channel.paused) {
            channel.pause();
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
        var channel, i, _len, _ref;
        _ref = this.sounds[name];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          channel = _ref[i];
          channel.currentTime = 0;
          this.stopLoop(name, i);
        }
        return this;
      },
      stopLoop: function(name, index) {
        return this.sounds[name][index].removeEventListener("ended", this.loopCallback, false);
      },
      loopCallback: function() {
        this.currentTime = -1;
        this.play();
        return this;
      },
      playSound: function(name, doLoop) {
        if (this.sounds[name].index >= this.sounds[name].length) {
          this.sounds[name].index = 0;
        }
        if (doLoop) {
          this.sounds[name][this.sounds[name].index].addEventListener("ended", this.loopCallback, false);
        }
        this.sounds[name][this.sounds[name].index++].play();
        return this.sounds[name].index;
      }
    };
  });
}).call(this);
