(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var COLOR = "#aaaaaa";
	var RADIUS = 10;
	
	Asteroids.Util.prototype.inherits.call(Asteroid, Asteroids.MovingObject);
	
	var Asteroid = Asteroids.Asteroid = function (pos, game){
		Asteroids.MovingObject.call(this, pos);
		this.game = game;
		this.vel = Asteroids.Util.prototype.randomVec.call(Asteroid, 10);
		this.color = COLOR;
		this.radius = RADIUS;
	};
})();