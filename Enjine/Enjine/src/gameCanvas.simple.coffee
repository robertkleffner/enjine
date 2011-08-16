###
	Base class to represent a double buffered canvas object.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class GameCanvas
		canvas: null
		context2D: null
		backBuffer: null
		backBufferContext2D: null
		betterBuffer: null
		autoResolutionMode: false
		
		initialize: (canvasId, resWidth, resHeight) ->
			@canvas = document.getElementById(canvasId)
			@context2D = @canvas.getContext("2d")
			@backBuffer = document.createElement("canvas")
			@backBuffer.width = resWidth
			@backBuffer.height = resHeight
			@backBufferContext2D = @backBuffer.getContext("2d")
			@betterBuffer = @backBufferContext2D
			@betterBuffer.width = @backBuffer.width
			@betterBuffer.height = @backBuffer.height
			@

		beginDraw: ->
			@backBufferContext2D.clearRect(0, 0, @backBuffer.width, @backBuffer.height)

		endDraw: ->
			@context2D.clearRect(0, 0, @canvas.width, @canvas.height)
			@context2D.drawImage(@backBuffer, 0, 0, @backBuffer.width, @backBuffer.height, 0, 0, @canvas.width, @canvas.height)

		fullScreen: (autoRes) ->
			@autoResolutionMode = autoRes
			@changeCanvasSize(window.innerWidth, window.innerHeight)
			window.onresize = =>
				document.body.style.margin = "0"
				document.body.style.padding = "0"
				@canvas.width = window.innerWidth
				@canvas.height = window.innerHeight
				if (@autoResolutionMode)
					@backBuffer.width = @canvas.width
					@backBuffer.height = @canvas.height
					@betterBuffer.width = @canvas.width
					@betterBuffer.height = @canvas.height
			@

		changeCanvasResolution: (resWidth, resHeight) ->
			@autoResolutionMode = false
			@backBuffer.width = resWidth
			@backBuffer.height = resHeight
			@betterBuffer.width = resWidth
			@betterBuffer.height = resHeight
			@

		changeCanvasSize: (width, height) ->
			@canvas.width = width
			@canvas.height = height
			window.onresize = null
			if (@autoResolutionMode)
				@backBuffer.width = width
				@backBuffer.height = height
				@betterBuffer.width = width
				@betterBuffer.height = height
			@
)