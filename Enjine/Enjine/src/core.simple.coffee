###
	Define the namespace of the Engine.
	Also includes functionality that is required for all internal workings of the engine.
	Code by Rob Kleffner, 2011
###

# module definition helper based on the one by @jashkenas on github
window.module = (name, func) ->
	if not @[name]?
		this[name] = {}
	if not @[name].module?
		@[name].module = window.module
	if func?
		func.apply(this[name], [])

@module("Enjine")