###
	Base class for all drawable object, makes ordering automatic.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class @Drawable
		# 0 at the front, higher goes back
		# used to reorder sprites in the drawable manager
		zOrder: 0

		#empty base function which makes sure all drawable objects have a draw method
		draw: (context) ->
)