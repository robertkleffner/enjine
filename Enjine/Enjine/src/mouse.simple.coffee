###
	Class that helps to manage mouse input.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	Buttons =
		mouseLeft: 0
		mouseRight: 2
		mouseWheel: 1
)

@module("Enjine", ->
	Mouse =
		x: 0
		y: 0
		pressed: []
		element: null
		containsMouse: false

		initialize: (element) ->
			@element = element
			@element.onmousedown = (event) => @pressed[event.button] = true
			@element.onmouseup = (event) => @pressed[event.button] = false
			@element.onmousemove = (event) => @mouseMoveEvent(event)
			@element.onmouseover = (event) => @containsMouse = true
			@element.onmouseout = (event) => @containsMouse = false; @x = -1; @y = -1;

		isButtonDown: (key) ->
			if @pressed[key]?
				@pressed[key]
			false

		mouseMoveEvent: (event) ->
			@x = event.pageX;
			@y = event.pageY;

			obj = @element;
			if obj.offsetParent
				while obj
					@x -= obj.offsetLeft
					@y -= obj.offsetTop
					obj = obj.offsetParent
)