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
	}
	
	Game.prototype.addAsteroids = function () {
		var asteroids = [];
		for(var i = 0; i < this.num_ast; i++){
			var ast = new Asteroids.Asteroid([20,20]);
			asteroids.push(new Asteroids.Asteroid(this.randomPosition()));
		}
		return asteroids;
	}
	
	Game.prototype.randomPosition = function () {
		var x = Math.floor(Math.random * this.dim_x);
		var y = Math.floor(Math.random * this.dim_y);
		return [x, y];
	}
	
	Game.prototype.draw = function (ctx) {
		ctx.clearRect(0, 0, this.dim_x, this.dim_y);
		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(ctx);
		}
	}
	
	Game.prototype.moveObjects = function () {
		for (var i = 0; i < this.asteroids.length; i++) {
			console.log(this.asteroids[i]);
			this.asteroids[i].move();
		}
	}
	
	

})();