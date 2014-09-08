(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var MovingObject = Asteroids.MovingObject = function (
			pos, 
			game,
			vel, 
			radius, 
			color) {
				
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
		this.game = game;
	};
	
	MovingObject.prototype.draw = function (ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		
		ctx.arc(
			this.pos[0],
			this.pos[1],
			this.radius,
			0,
			2 * Math.PI,
			false
		);
		
		ctx.fill();
	};
	
	MovingObject.prototype.move = function () {
		var x = this.pos[0] + this.vel[0];
		var y = this.pos[1] + this.vel[1];
		this.pos = this.game.wrap([x, y]);
	};
	
	
})();

// var mo = MovingObject