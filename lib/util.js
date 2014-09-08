(function () {
	if (typeOf Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var Util = Asteroids.Util = function (params) {
	};
	
	Util.prototype.inherits = function (SuperClass) {
		function Surrogate () {}
		Surrogate.prototype = SuperClass.prototype;
		this.prototype = new Surrogate();
	};
	
	Util.prototype.randomVec = function (length) {
		return [Math.floor(length * Math.random()), 
						Math.floor(length * Math.random())
						];
	}; 
	
})();
