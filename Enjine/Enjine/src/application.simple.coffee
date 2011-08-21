###
	A basic wrapper to get a game engine setup.
	Will be fine for most games.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class @Application
		canvas: null
		timer: null
		stateContext: null

		constructor: ->
			@

		update: (delta) =>
			@stateContext.update(delta)
			@canvas.beginDraw()
			@stateContext.draw(@canvas.betterBuffer)
			@canvas.endDraw()

		initialize: (canvasId, defaultState, resWidth, resHeight) =>
			@canvas = new Enjine.GameCanvas()
			@timer = new Enjine.GameTimer()
			Enjine.Keyboard.initialize()
			Enjine.Mouse.initialize(document.getElementById(canvasId))
			@canvas.initialize(canvasId, resWidth, resHeight)
			@timer.updateObject = this

			@stateContext = new Enjine.GameStateContext(defaultState)

			@timer.start()
)