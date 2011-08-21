###
	For sprites that are only a portion of an image.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class @FrameSprite extends @Sprite
		frameX: 0
		frameY: 0
		frameWidth: 0
		frameHeight: 0

		draw: (context, camera) ->
			context.save();
			context.translate(@x - camera.x, @y - camera.y)
			context.rotate(angle)
			context.scale(@xScale, @yScale)
			context.drawImage(@image, @frameX, @frameY, @frameWidth, @frameHeight, -@frameWidth * @xPivot, -@frameHeight * @yPivot, @frameWidth, @frameHeight)
			context.restore()
			@
)