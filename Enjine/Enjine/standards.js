(function() {
  /*
  	# This file contains a list of CoffeeScript coding standards that I like to abide by.
  	# This document is subject to change at anytime I feel like it becomes necessary.
  	# ---------
  	# Rob Kleffner
  	# Last Updated - 8/13/2011
  */
  /*
  	# local variable definitions
  */
  var Noob, doStuff, myObject, myVariable, theObject;
  myVariable = 1;
  myObject = {
    one: 1,
    two: 2
  };
  myObject.prototype.fooBar = function() {
    return alert("noob");
  };
  /*
  	# function/method related
  */
  alert("hi");
  doStuff = function() {
    return alert("only one line");
  };
  /*
  	# object/array literals
  */
  theObject = {
    uno: 1,
    dos: 2,
    tres: 3
  };
  /*
  	# classes
  */
  Noob = (function() {
    function Noob() {}
    return Noob;
  })();
}).call(this);
