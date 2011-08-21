###
	Define the namespace of the Engine.
	Also includes functionality that is required for all internal workings of the engine.
	Code by Rob Kleffner, 2011
###

# module definition helper based on the one by @jashkenas on github
window.module = (name, func) ->
	unless @[name]?
		this[name] = {}
	unless @[name].module?
		@[name].module = window.module
	if func?
		func.apply(this[name], [])