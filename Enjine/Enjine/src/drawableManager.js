(function() {
  /*
  	Class to help manage and draw a collection of sprites.
  	Code by Rob Kleffner, 2011
  */  this.module("Enjine", function() {
    return this.DrawableManager = (function() {
      function DrawableManager() {}
      DrawableManager.prototype.unsorted = true;
      DrawableManager.prototype.objects = [];
      DrawableManager.prototype.add = function(objs) {
        if (object instanceof Array) {
          this.objects = this.objects.concat(objs);
        } else {
          this.objects.push(objs);
        }
        this.unsorted = true;
        return this;
      };
      DrawableManager.prototype.clear = function() {
        this.objects = [];
        return this;
      };
      DrawableManager.prototype.contains = function(obj) {
        var i;
        i = this.objects.length;
        while (i -= 1) {
          if (this.objects[i] === obj) {
            true;
          }
        }
        return false;
      };
      DrawableManager.prototype.remove = function(obj, indexTwo) {
        var item, t, _i, _len, _ref, _ref2, _ref3;
        if (obj instanceof Drawable) {
          if ((t = this.objects.indexOf(obj)) > -1) {
            [].splice.apply(this.objects, [t, t - t + 1].concat(_ref = [])), _ref;
          }
        } else if (obj instanceof Array) {
          _ref2 = this.objects;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            item = _ref2[_i];
            this.remove(item);
          }
        } else {
          [].splice.apply(this.objects, [obj, indexTwo - obj].concat(_ref3 = [])), _ref3;
        }
        return this;
      };
      DrawableManager.prototype.update = function(delta) {
        var item, _i, _len, _ref, _results;
        _ref = this.objects;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(typeof item.update === "function" ? item.update(delta) : void 0);
        }
        return _results;
      };
      DrawableManager.prototype.draw = function(context, camera) {
        var item, _i, _len, _ref, _results;
        if (this.unsorted) {
          this.unsorted = false;
          this.objects.sort(function(x1, x2) {
            return x1.zOrder - x2.zOrder;
          });
        }
        _ref = this.objects;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(typeof item.draw === "function" ? item.draw(context, camera) : void 0);
        }
        return _results;
      };
      return DrawableManager;
    })();
  });
}).call(this);
