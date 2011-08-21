###
	Contains useful functions for making 2D vector math easier.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class @Vector2
		constructor: (@x, @y) ->

		equals: (vec) ->
			(@x == vec.x and @y == vec.y)

		dot: (vec) ->
			(@x * vec.x + @y * vec.y)

		len: ->
			Math.sqrt(@x * @x + @y * @y)

		normalize: ->
			len = Math.sqrt(@x * @x + @y * @y)
			@x / len
			@y / len
			@

		add: (vec) ->
			@x += vec.x
			@y += vec.y
			@

		sub: (vec) ->
			@x -= vec.x
			@y -= vec.y
			@

		scale: (scalar) ->
			@x *= scalar
			@y *= scalar
			@

		mul: (vec) ->
			@x *= vec.x
			@y *= vec.y
			@

		div: (vec) ->
			@x /= vec.x
			@y /= vec.y
			@

		this.zero = new Vector2(0, 0)
		this.one = new Vector2(1, 1)
		this.unitX = new Vector2(1, 0)
		this.unitY = new Vector2(0, 1)

		this.dot = (v1, v2) ->
			v1.x * v2.x + v1.y * v2.y

		this.len = (vec) ->
			Math.sqrt(vec.x * vec.x + vec.y * vec.y)

		this.add = (v1, v2) ->
			new Vector2(v1.x + v2.x, v1.y + v2.y)

		this.sub = (v1, v2) ->
			new Vector2(v1.x - v2.x, v1.y - v2.y)

		this.scale = (vec, scalar) ->
			new Vector2(vec.x * scalar, vec.y * scalar)

		this.mul = (v1, v2) ->
			new Vector2(v1.x * v2.x, v1.y * v2.y)

		this.div = (v1, v2) ->
			new Vector2(v1.x / v2.x, v1.y / v2.y)
)