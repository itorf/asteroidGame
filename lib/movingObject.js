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
		if (this instanceof Asteroids.Ship){
			
			ctx.beginPath();
	    ctx.moveTo(
				this.pos[0] + this.radius * Math.cos(this.direction), 
				this.pos[1] + this.radius * Math.sin(this.direction)
			);
	    ctx.lineTo(
				this.pos[0] + this.radius * Math.cos(2 * Math.PI/3 + this.direction),
				this.pos[1] + this.radius * Math.sin(2 * Math.PI/3 + this.direction)
			);
			ctx.strokeStyle = this.color;
			ctx.stroke();
			
			// ctx.beginPath();
// 			ctx.moveTo(
// 				this.pos[0] + this.radius * Math.cos(2 * Math.PI/3 + this.direction),
// 				this.pos[1] + this.radius * Math.sin(2 * Math.PI/3 + this.direction)
// 			);
// 			ctx.lineTo(
// 				this.pos[0] + this.radius * Math.cos(4 * Math.PI/3 + this.direction),
// 				this.pos[1] + this.radius * Math.sin(4 * Math.PI/3 + this.direction)
// 			);
// 			ctx.strokeStyle = this.color;
// 			ctx.stroke();
			
			ctx.beginPath();
			ctx.moveTo(
				this.pos[0] + this.radius * Math.cos(4 * Math.PI/3 + this.direction),
				this.pos[1] + this.radius * Math.sin(4 * Math.PI/3 + this.direction)
			);
			ctx.lineTo(
				this.pos[0] + this.radius * Math.cos(this.direction),
				this.pos[1] + this.radius * Math.sin(this.direction)
			);
			ctx.strokeStyle = this.color;
			ctx.stroke();

		} else {
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
		}
	};
	
	MovingObject.prototype.move = function () {
		var x = this.pos[0] + this.vel[0];
		var y = this.pos[1] + this.vel[1];
		// this.pos = this.game.wrap([x, y]);
		if (this.game.isOutOfBounds([x, y])) {
			if (this.isWrappable) {
				this.pos = this.game.wrap([x, y]);
			} else {
				this.game.remove(this);
			}
		} else {
			this.pos = this.game.wrap([x, y]);
		}
	};
	
	MovingObject.prototype.isWrappable = true;
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
		var delta_x = this.pos[0] - otherObject.pos[0];
		var delta_y = this.pos[1] - otherObject.pos[1];
		// optimization: avoiding square roots. 
		var distance_squared = delta_x * delta_x + delta_y * delta_y;
		var radius_sum = this.radius + otherObject.radius;
		if (distance_squared < radius_sum * radius_sum) {
			return true;
		} else {
			return false;
		}
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
		if ((this instanceof Asteroids.Asteroid) && 
				(otherObject instanceof Asteroids.Asteroid)) {
			if (this.radius > otherObject.radius) {
				this.game.remove(otherObject);
			} else if (this.radius < otherObject.radius) {
				this.game.remove(this);
			} else if (this.radius === otherObject.radius){
				this.game.remove(otherObject);
				this.game.remove(this);	
			}
		} else if ((this instanceof Asteroids.Asteroid) && 
				(otherObject instanceof Asteroids.Bullet)) {
			var radius = this.radius;
			switch (true) {
			case (radius > 25):
				this.game.score += 10;
				break;
			case (radius > 15):
				this.game.score += 20;
				break;
			case (radius > 5):
				this.game.score += 35;
				break;
			}
			this.game.remove(otherObject);
			this.game.remove(this); 
			this.game.hits += 1;
		} else {
			this.game.remove(otherObject);
			this.game.remove(this); 
		}
	};
})();

// var mo = MovingObject