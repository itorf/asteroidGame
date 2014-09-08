(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var GameView = Asteroids.GameView = function (game, ctx){
		this.game = game;
		this.ctx = ctx;
	};
	
	GameView.prototype.start = function () {
	
	setInterval(this.game.moveObjects(), 1000);
	setInterval(this.game.draw(this.ctx), 1000);	
	};
	
})();