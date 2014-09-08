(function () {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var Util = Asteroids.Util = {};
	
	Util.inherits = function (SuperClass) {
		function Surrogate () {}
		Surrogate.prototype = SuperClass.prototype;
		this.prototype = new Surrogate();
	};
	
	Util.randomVec = function (length) {
		return [Math.floor(length * Math.random()), 
						Math.floor(length * Math.random())
						];
	}; 
	
})();
