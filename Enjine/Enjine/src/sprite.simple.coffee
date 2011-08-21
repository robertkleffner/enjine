###
	Represents a simple static sprite.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class @Sprite extends @Drawable
		xPivot: 0.5
		yPivot: 0.5
		angle: 0
		xScale: 1
		yScale: 1
		image: null

		draw: (context, camera) ->
			context.save()
			context.translate(@x - camera.x, @y - camera.y)
			context.rotate(@angle)
			context.scale(@xScale, @yScale)
			context.drawImage(@image, -@image.width * @xPivot, -@image.height * @yPivot)
			context.restore()
			@
)