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
		return [
		  Math.floor(length * (Math.random() - 0.5) * 2), 
			Math.floor(length * (Math.random() - 0.5) * 2)
		];
	}; 
	
})();