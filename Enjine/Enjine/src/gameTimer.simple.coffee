###
	Represents a very basic game timer.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class GameTimer
		framesPerSecond: 1000 / 30
		lastTime: 0
		intervalFunc: null
		updateObject: null

		start: ->
			@lastTime = new Date().getTime()
			@intervalFunc = setInterval((=> @tick()), @framesPerSecond)
			@

		tick: ->
			newTime = new Date().getTime()
			delta = (newTime - @lastTime) / 1000

			if @updateObject?
				@lastTime = newTime
				@updateObject.update(delta)
			@

		stop: ->
			clearInterval(@intervalFunc)
			@
)