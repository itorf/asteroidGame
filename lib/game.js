(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	DIM_X = 800;
	DIM_Y = 600;
	NUM_ASTEROIDS = 12;
	
	var Game = Asteroids.Game = function (height, width) {
		this.dim_x = width;
		this.dim_y = height;
		this.num_ast = NUM_ASTEROIDS;
		this.asteroids = [];
		this.ships = [];
		this.bullets = [];
		this.score = 0;
		this.shots_fired = 0;
		this.hits = 0;
		this.over = false;
		
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
	
	Game.prototype.refillAsteroids = function () {
		if (this.asteroids.length <= 5) {
			for (var i = 0; i < Math.floor((Math.random() * 10) + 1); i++){
				this.add(new Asteroids.Asteroid(this.randomSidePoint(), this));
			}
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
	
	Game.prototype.randomSidePoint = function () {
		var y = 0;
		var x = Math.floor(Math.random() * this.dim_x);
		return [x, y];
	}
	
	Game.prototype.draw = function (ctx) {
		// ctx.clearRect(0, 0, this.dim_x, this.dim_y);
		var img = new Image();
		img.src = "space.jpg";
		var pat = ctx.createPattern(img, 'repeat');
		ctx.fillStyle = pat;
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
		if (!this.over){
			document.getElementById('over').innerHTML = " ";
			document.getElementById('final_stats').innerHTML = " ";
			this.refillAsteroids();
			this.moveObjects();
			this.checkCollisions();
			this.updateStats();	
		} else {
			this.displayEnd();
		}
	};
	
	Game.prototype.displayEnd = function () {
		var accuracy = Math.floor((this.hits / this.shots_fired) * 100);
		if (isNaN(accuracy)){
			accuracy = 0;
		}
		var final_stats = "Score: " + this.score + 
					" Accuracy: " + accuracy + "%";
		document.getElementById('over').innerHTML = "Game Over";
		document.getElementById('final_stats').innerHTML = final_stats;
		document.getElementById('play_again').innerHTML = "Press 'enter' to start over";
		
		document.onkeypress = function (event) {
			if (event.keyCode === 13){
				location.reload(true);
			}
		}
	}
	
	Game.prototype.updateStats = function () {
		var score = this.score;
		var accuracy = Math.floor((this.hits / this.shots_fired) * 100);
		document.getElementById('score').innerHTML = "Score: " + score;
		if (!isNaN(accuracy)){
		document.getElementById('accuracy').innerHTML = "Accuracy: " + 
																												accuracy + "%";	
		}
	}
	
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
		if (pos[0] > this.dim_x || pos[0] < 0){
			return true;
		} else if (pos[1] > this.dim_y || pos[1] < 0) {
			return true;
		} else {
			return false;
		}
	};
	
})();