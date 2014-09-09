(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	DIM_X = 600;
	DIM_Y = 600;
	NUM_ASTEROIDS = 5;
	
	var Game = Asteroids.Game = function () {
		this.dim_x = DIM_X;
		this.dim_y = DIM_Y;
		this.num_ast = NUM_ASTEROIDS;
		this.asteroids = this.addAsteroids();
		this.ship = new Asteroids.Ship(this.randomPosition, this);
	};
	
	Game.prototype.allObjects = function () {
		var allObjs = [];
		for (var i = 0; i < this.asteroids.length; i++){
			allObjs.push(this.asteroids[i]);
		}
		allObjs.push(this.ship);
		
		return allObjs;
	};
	
	Game.prototype.addAsteroids = function () {
		var asteroids = [];
		for(var i = 0; i < this.num_ast; i++){
			asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
		}
		return asteroids;
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
		// outer loop
		var allObjs = this.allObjects();
		for (i = 0; i < allObjs.length; i++) {
			// inner loop
			for (j = i + 1; j < allObjs.length; j++) {
				if (allObjs[i].isCollidedWith(allObjs[j])) {
					// console.log("collide: " + i + ", " + j);
					allObjs[i].collideWith(allObjs[j]);
					//alert("COLLISION");
				}
			}
		}
	} // checkCollisions
	
	Game.prototype.step = function () {
		this.moveObjects();
		this.checkCollisions();
	}
	
	Game.prototype.remove = function (asteroid){
		var index = this.asteroids.indexOf(asteroid);
		if (index > -1){
			this.asteroids.splice(index, 1);	
		}
	};
	
})();