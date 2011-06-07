/**
	Basic bounding box collision object.
	Code by Rob Kleffner, 2011
*/

$e.Collideable = function(obj, width, height, collisionEvent) {
    this.base = obj;
    this.x = obj.x;
    this.y = obj.y;
    this.width = width;
    this.height = height;
    
    if (collisionEvent !== null) {
        this.collisionEvent = collisionEvent;
    } else {
        this.collisionEvent = function() {};
    }
};

$e.Collideable.prototype = {
    update: function() {
        this.x = this.base.x;
        this.y = this.base.y;
    },
    
    checkCollision: function(other) {
        if (this.y + this.height < other.y) {
            return;
        }
        if (this.y > other.y + other.height) {
            return;
        }
        if (this.x + this.width < other.x) {
            return;
        }
        if (this.x > other.x + other.width) {
            return;
        }
        
        //collision, fire the events!
        this.collisionEvent(other);
        other.collisionEvent(this);
    }
};