(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var RADIUS = 10;
	var COLOR = "#FFFFFF";
	
	var Ship = Asteroids.Ship = function (pos, game) {
		this.pos = [300, 300];
		this.game = game;
		this.color = COLOR;
		this.radius = RADIUS;
		this.vel = [1, 0];
	};
	
	Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject);
	
	Ship.prototype.relocate = function () {
		this.pos = this.game.randomPosition();
		this.vel = [0, 0];
	}
})();