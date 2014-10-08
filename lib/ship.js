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
		this.vel = [0, 0];
	};
	
	Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject);
	
	Ship.prototype.relocate = function () {
		this.pos = this.game.randomPosition();
		this.vel = [0, 0];
	};
	
	Ship.prototype.power = function (impulse) {
		var x = this.vel[0] + impulse[0];
		var y = this.vel[1] + impulse[1];
		this.vel = [x, y];
	};
	
	Ship.prototype.fireBullet = function () {
		var x = (this.vel[0] * 2) + 1;
		var y = (this.vel[1] * 2) + 1;
		var bullet = new Asteroids.Bullet(this.pos, this.game, [x,y])
		this.game.add(bullet);
	};
})();