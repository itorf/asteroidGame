(function () {
	if (typeOf Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var GameView = Asteroids.GameView = function (game, ctx){
		this.game = game;
		this.ctx = ctx;
	};
	
	GameView.prototype.start = function () {
	
	setInterval(this.game.moveObjects, 20);
	setInterval(this.game.draw, 20);	
	};
	
})();