(function () {
	if (typeOf Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	Asteroid.COLOR = "#aaaaaa";
	Asteroid.RADIUS = 10;
	
	
	
	function Asteroid (pos){
		MovingObject.call(this, pos);
		this.vel = Asteroid.randomVec(10);
		this.color = Asteroid.COLOR;
		this.radius = Asteroid.RADIUS;
	}
	
	Asteroid.inherits(MovingObject);
	
	
})();