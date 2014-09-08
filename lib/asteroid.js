(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var COLOR = "#aaaaaa";
	var RADIUS = 10;
	
	var Asteroid = Asteroids.Asteroid = function (pos, game){
		Asteroids.MovingObject.call(this, pos);
		this.game = game;
		this.vel = Asteroids.Util.randomVec.call(Asteroid, 10);
		this.color = COLOR;
		this.radius = RADIUS;
	};
	
	Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);
})();