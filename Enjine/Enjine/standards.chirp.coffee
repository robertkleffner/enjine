###
	# This file contains a list of CoffeeScript coding standards that I like to abide by.
	# This document is subject to change at anytime I feel like it becomes necessary.
	# ---------
	# Rob Kleffner
	# Last Updated - 8/13/2011
###

###
	# local variable definitions
###

# naming - always use predominantly lower case camel humps
myVariable = 1

# object instance names abide by the same rule, as do property names
# private variables should be prefixed with an underscore (_)
myObject = one: 1, two: 2

# function and method names abide by the same rule
myObject::fooBar = -> alert("noob")


###
	# function/method related
###

# invocation: always use parens
alert("hi")

# definition: always use multiple lines
doStuff = ->
	alert("only one line")


###
	# object/array literals
###

# one line if fairly short
theObject = { uno: 1, dos: 2, tres: 3 }

# multiple lines if fairly long, or containing function definitions
# similar for arrays


###
	# classes
###

# always have capital names
class Noob

