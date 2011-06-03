/**
	Basic bounding box collision object.
	Code by Rob Kleffner, 2011
*/

$e.Collideable = function(obj, width, height, collisionEvent) {
    this.Base = obj;
    this.x = obj.x;
    this.y = obj.y;
    this.width = width;
    this.height = height;
    
    if (collisionEvent != null) {
        this.collisionEvent = collisionEvent;
    } else {
        this.collisionEvent = function() {}
    }
};

$e.Collideable.prototype = {
    update: function() {
        this.x = this.Base.x;
        this.y = this.Base.y;
    },
    
    checkCollision: function(other) {
        var left1 = this.x, left2 = other.x, right1 = (this.x + this.width), right2 = (other.x + other.width),
			top1 = this.y, top2 = other.y, bottom1 = (this.y + this.height), bottom2 = other.y + other.height;
        
        if (bottom1 < top2) {
            return;
        }
        if (top1 > bottom2) {
            return;
        }
        if (right1 < left2) {
            return;
        }
        if (left1 > right2) {
            return;
        }
        
        //collision, fire the events!
        this.collisionEvent(other);
        other.collisionEvent(this);
    }
};