(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var GameView = Asteroids.GameView = function (game, ctx){
		this.game = game;
		this.ctx = ctx;
		this.ship = this.game.addShip();
	};
	
	GameView.prototype.start = function () {
		setInterval((function () {
			this.game.step();
			this.game.draw(this.ctx);
		}).bind(this), 100);
		
		this.bindKeyHandlers();
	};
	
	GameView.prototype.bindKeyHandlers = function () {
		var that = this;
		key('o', function (){
			that.ship.power(1);
		});
		key('l', function (){
			that.ship.power(-1);
		});
		key('k', function (){
			that.ship.direction -= 0.5;
		});
		key(';', function (){
			that.ship.direction += 0.5;
		});
		key('m', function (){
			that.ship.fireBullet();
		})
	};
	
})();