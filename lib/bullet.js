(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var COLOR = "#FF0000";
	var RADIUS = 3;
	
	var Bullet = Asteroids.Bullet = function (pos, game, vel) {
		Asteroids.MovingObject.call(this, pos);
		this.game = game;
		this.vel = vel;
		this.color = COLOR;
		this.radius = RADIUS;
	}
	
	Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject);
	
	Bullet.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Asteroid){
			Asteroids.MovingObject.prototype.collideWith.call(this, otherObject);
		}
	};
	
	Bullet.prototype.isWrappable = false;
})();