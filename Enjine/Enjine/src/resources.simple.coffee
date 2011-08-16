#
#	Represents a simple static sprite.
#	Code by Rob Kleffner, 2011
#

@module("Enjine", ->
	Resources =
		images: {}
		sounds: {}

		destroy: ->
			delete @images
			delete @sounds
			@

		addImage: (name, src) ->
			tempImage = new Image()
			@images[name] = tempImage
			tempImage.src = src
			@

		addImages: (array) ->
			tempImage = null
			for imgData in array
				tempImage = new Image()
				@images[imgData.name] = tempImage
				tempImage.src = imgData.src
			@

		clearImages: ->
			delete @images
			@images = {}
			@

		removeImage: (name) ->
			delete @images[name]
			@

		addSound: (name, src, maxChannels) ->
			@sounds[name] = []
			@sounds[name].index = 0
			unless maxChannels
				maxChannels = 3
			i = 0
			while i < maxChannels
				@sounds[name][i] = new Audio(src)
				i++
			@

		clearSounds: ->
			delete @sounds
			@sounds = {}
			@

		removeSound: (name) ->
			delete @sounds[name]
			@

		pauseChannel: (name, index) ->
			unless @sounds[name][index].paused
				@sounds[name][index].pause()
			@

		pauseSound: (name) ->
			for channel in @sounds[name]
				unless channel.paused
					channel.pause()
			@

		resetChannel: (name, index) ->
			@sounds[name][index].currentTime = 0
			@stopLoop(name, index)
			@

		resetSound: (name) ->
			for channel, i in @sounds[name]
				channel.currentTime = 0
				@stopLoop(name, i)
			@

		stopLoop: (name, index) ->
			@sounds[name][index].removeEventListener("ended", @loopCallback, false)

		loopCallback: ->
			@currentTime = -1
			@play()
			@

		playSound: (name, doLoop) ->
			if @sounds[name].index >= @sounds[name].length
				@sounds[name].index = 0
			if doLoop
				@sounds[name][@sounds[name].index].addEventListener("ended", @loopCallback, false)
			@sounds[name][@sounds[name].index++].play()
			@sounds[name].index
)