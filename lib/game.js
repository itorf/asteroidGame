(function () {
	if (typeOf Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	Game.DIM_X = 600;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 5;
	
	var Game = Asteroids.Game = function () {
		this.dim_x = Game.DIM_X;
		this.dim_y = Game.DIM_Y;
		this.num_ast = Game.NUM_ASTEROIDS;
		this.asteroids = this.addAsteroids();
	}
	
	Game.prototype.addAsteroids = function () {
		var asteroids = [];
		for(var i = 0; i < this.num_ast; i++){
			asteroids.push(new Asteroid(this.randomPosition()));
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
	
	Game.prototype.move = function () {
		for (var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].move();
		}
	}
	
	

})();