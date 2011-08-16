###
	Represents a sprite sheet for a font.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class SpriteFont extends Drawable
		constructor: (@image, @letterWidth, @letterHeight, @letters) ->
			@letterSpacing = 0
			@lineHeight = 0
			@strings = []

		addString: (str, xPos, yPos) ->
			strObj = { string: str, x: xPos, y: yPos }
			@strings.push(strObj)
			@

		removeString: (index) ->
			@strings[index..index] = []
			@

		draw: (context, camera) ->
			for s in @strings
				x = s.x
				y = s.y

				for c, i in s.string
					code = s.string.charCodeAt(i)

					if code is 10
						y += @letterHeight + @lineHeight
						x = s.x
					else
						context.drawImage(@image, @letters[code].x, @letters[code].y, @letterWidth, @letterHeight, x - camera.x, y - camera.y, @letterWidth, @letterHeight)
						x += @letterWidth + @letterSpacing
			@
)