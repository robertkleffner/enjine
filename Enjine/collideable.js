/**
	Basic bounding box collision object.
	Code by Rob Kleffner, 2011
*/

$e.Collideable = function(obj, width, height, collisionEvent) {
    this.Base = obj;
    this.x = obj.x;
    this.y = obj.y;
    this.Width = width;
    this.Height = height;
    
    if (collisionEvent != null) {
        this.CollisionEvent = collisionEvent;
    } else {
        this.CollisionEvent = function() {}
    }
}

$e.Collideable.prototype = {
    Update: function() {
        this.x = this.Base.x;
        this.y = this.Base.y;
    },
    
    CheckCollision: function(other) {
        var left1 = this.x, left2 = other.x;
        var right1 = (this.x + this.Width), right2 = (other.x + other.Width);
        var top1 = this.y, top2 = other.y;
        var bottom1 = (this.y + this.Height), bottom2 = other.y + other.Height;
        
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
        this.CollisionEvent(other);
        other.CollisionEvent(this);
    }
}