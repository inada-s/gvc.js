(function () { "use strict";
var gv = {};
gv.GvMain = function() { };
gv.GvMain.main = function() {
	window.onload = function(e) {
		var canvas = window.document.createElement("canvas");
		window.document.body.appendChild(canvas);
		canvas.style.position = "absolute";
		canvas.style.left = "0px";
		canvas.style.top = "0px";
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var ctx = canvas.getContext("2d");
		window.onresize = function(e1) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			ctx.beginPath();
			ctx.fillRect(20,20,80,40);
		};
		ctx.beginPath();
		ctx.fillRect(20,20,80,40);
	};
};
gv.GvMain.main();
})();
