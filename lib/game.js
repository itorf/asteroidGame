(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	DIM_X = 600;
	DIM_Y = 600;
	NUM_ASTEROIDS = 10;
	
	var Game = Asteroids.Game = function () {
		this.dim_x = DIM_X;
		this.dim_y = DIM_Y;
		this.num_ast = NUM_ASTEROIDS;
		this.asteroids = [];
		this.ships = [];
		this.bullets = [];
		
		this.addAsteroids();
	};
	
	Game.prototype.allObjects = function () {
		var allObjs = [];
		for (var i = 0; i < this.asteroids.length; i++){
			allObjs.push(this.asteroids[i]);
		}
		for (var i = 0; i < this.bullets.length; i++){
			allObjs.push(this.bullets[i]);
		}
		allObjs.push(this.ships[0]);
		
		return allObjs;
	};
	
	Game.prototype.add = function (object){
		if (object instanceof Asteroids.Asteroid){
			this.asteroids.push(object);
		} else if (object instanceof Asteroids.Bullet){
			this.bullets.push(object);
		}
	};
	
	Game.prototype.addAsteroids = function () {
		for(var i = 0; i < this.num_ast; i++){
			this.add(new Asteroids.Asteroid(this.randomPosition(), this));
		}
	};
	
	Game.prototype.addShip = function () {
		var ship = new Asteroids.Ship(this.randomPosition, this);
		this.ships.push(ship);
		return ship;
	};
	
	Game.prototype.randomPosition = function () {
		var x = Math.floor(Math.random() * this.dim_x);
		var y = Math.floor(Math.random() * this.dim_y);
		return [x, y];
	};
	
	Game.prototype.draw = function (ctx) {
		// ctx.clearRect(0, 0, this.dim_x, this.dim_y);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.dim_x, this.dim_y);
		var allObjs = this.allObjects();
		for (var i = 0; i < allObjs.length; i++){
			allObjs[i].draw(ctx);
		}
	};
	
	Game.prototype.moveObjects = function () {
		var allObjs = this.allObjects();
		for (var i = 0; i < allObjs.length; i++) {
			allObjs[i].move();
		}
	};
	
	Game.prototype.wrap = function(pos){
		var x = pos[0] % this.dim_x;
		var y = pos[1] % this.dim_y;
		if (x < 0) { x += this.dim_x };
		if (y < 0) { y += this.dim_y };
		return [x, y];
	};
	
	Game.prototype.checkCollisions = function () {
		var allObjs = this.allObjects();
		for (i = 0; i < allObjs.length; i++) {
			for (j = i + 1; j < allObjs.length; j++) {
				if (allObjs[i].isCollidedWith(allObjs[j])) {
					console.log("collide: " + i + ", " + j);
					allObjs[i].collideWith(allObjs[j]);
				}
			}
		}
	};
	
	Game.prototype.step = function () {
		this.moveObjects();
		this.checkCollisions();
	};
	
	Game.prototype.remove = function (object){
		if (object instanceof Asteroids.Asteroid) {
			var index = this.asteroids.indexOf(object);
			if (index > -1){
				this.asteroids.splice(index, 1);	
			}	
		} else if (object instanceof Asteroids.Bullet) {
			var index = this.bullets.indexOf(object);
			if (index > -1){
				this.bullets.splice(index, 1);	
			}
		}
	};
	
	Game.prototype.isOutOfBounds = function (pos) {
		if (pos[0] > this.dim_y || pos[0] < 0){
			return true;
		} else if (pos[1] > this.dim_x || pos[1] < 0) {
			return true;
		} else {
			return false;
		}
	};
	
})();