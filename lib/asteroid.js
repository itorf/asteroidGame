(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var COLOR = "#aaaaaa";
	
	var Asteroid = Asteroids.Asteroid = function (pos, game){
		Asteroids.MovingObject.call(this, pos);
		this.game = game;
		this.vel = Asteroids.Util.randomVec.call(
			Asteroid, 
			Math.floor((Math.random() * 10) + 1));
		this.color = COLOR;
		this.radius = Math.floor((Math.random() * 30) + 5);
	};
	
	Asteroids.Util.inherits.call(Asteroids.Asteroid, Asteroids.MovingObject);
	
	Asteroid.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Ship) {
			this.game.over = true;
		} else {
			Asteroids.MovingObject.prototype.collideWith.call(this, otherObject);
		}
	};
	
})();