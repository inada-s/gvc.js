(function () { "use strict";
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
};
var Main = function() { };
Main.main = function() {
	gv.Gv.circle(1.0,1.0);
	gv.Gv.circle(2.0,1.0).color(0);
	gv.Gv.circle(3.0,1.0).color(1);
	gv.Gv.circle(4.0,1.0).color(2);
	gv.Gv.circle(1.0,2.0).rgb(255,0,0);
	gv.Gv.newTime();
	gv.Gv.circle(2.0,1.0).color(0);
	gv.Gv.circle(3.0,1.0).color(1);
	gv.Gv.circle(4.0,1.0).color(2);
	gv.Gv.circle(1.0,2.0).rgb(255,0,0);
};
var IMap = function() { };
var Std = function() { };
Std["int"] = function(x) {
	return x | 0;
};
var gv = {};
gv.Gv = function() { };
gv.Gv.newTime = function(time) {
	if(!gv.Gv.enable_) return;
	gv.GvCore.newTime(time);
};
gv.Gv.circle = function(x,y,r) {
	if(r == null) r = 0.5;
	var ret = new gv.GvSnapItem_Circle(x,y,r);
	if(gv.Gv.enable_) gv.GvCore.addItem(ret);
	return ret;
};
gv.GvCore = function() { };
gv.GvCore.newTime = function(time) {
	if(time == null) gv.GvCore.nowTime = Std["int"](0.1 + Math.max(0,gv.GvCore.maxTime + 1)); else {
		gv.GvCore.maxTime = Std["int"](0.1 + Math.max(gv.GvCore.maxTime,time));
		gv.GvCore.nowTime = time;
	}
};
gv.GvCore.addItem = function(item) {
	if(gv.GvCore.emptyFlag) {
		gv.GvCore.emptyFlag = false;
		gv.GvCore.minX = item.getMinX();
		gv.GvCore.minY = item.getMinY();
		gv.GvCore.maxX = item.getMaxX();
		gv.GvCore.maxY = item.getMaxY();
		gv.GvCore.maxTime = gv.GvCore.nowTime;
	} else {
		gv.GvCore.minX = Math.min(gv.GvCore.minX,item.getMinX());
		gv.GvCore.minY = Math.min(gv.GvCore.minY,item.getMinY());
		gv.GvCore.maxX = Math.max(gv.GvCore.maxX,item.getMaxX());
		gv.GvCore.maxY = Math.max(gv.GvCore.maxY,item.getMaxY());
		gv.GvCore.maxTime = Std["int"](0.1 + Math.max(gv.GvCore.maxTime,gv.GvCore.nowTime));
	}
	if(gv.GvCore.snapMap.exists(gv.GvCore.nowTime)) {
		var snap = gv.GvCore.snapMap.get(gv.GvCore.nowTime);
		snap.addItem(item);
	} else {
		var snap1 = new gv.GvSnap(gv.GvCore.nowTime);
		gv.GvCore.snapMap.set(gv.GvCore.nowTime,snap1);
		snap1.addItem(item);
	}
};
gv.GvCore.getMinX = function() {
	return gv.GvCore.minX;
};
gv.GvCore.getMinY = function() {
	return gv.GvCore.minY;
};
gv.GvCore.getMaxX = function() {
	return gv.GvCore.maxX;
};
gv.GvCore.getMaxY = function() {
	return gv.GvCore.maxY;
};
gv.GvCore.getTimeList = function() {
	var ret = new Array();
	var $it0 = gv.GvCore.snapMap.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		ret.push(k);
	}
	return ret;
};
gv.GvCore.getSnap = function(time) {
	return gv.GvCore.snapMap.get(time);
};
gv.GvCore.getAutoModeCount = function() {
	return gv.GvCore.autoModeCount;
};
gv.GvCore.sendInput = function(time,x,y) {
};
gv.GvCore.gvGetColorFromIndex = function(idx) {
	return gv.GvCore.colors[idx];
};
gv.GvMain = function() { };
gv.GvMain.main = function() {
	window.onload = function(e) {
		gv.GvMain.canvas = window.document.createElement("canvas");
		window.document.body.appendChild(gv.GvMain.canvas);
		gv.GvMain.canvas.style.position = "absolute";
		gv.GvMain.canvas.style.left = "0px";
		gv.GvMain.canvas.style.top = "0px";
		gv.GvMain.canvas.style.width = "100%";
		gv.GvMain.canvas.style.height = "100%";
		gv.GvMain.canvas.width = window.innerWidth;
		gv.GvMain.canvas.height = window.innerHeight;
		gv.GvMain.ctx = gv.GvMain.canvas.getContext("2d");
		window.onresize = function(e1) {
			gv.GvMain.canvas.width = window.innerWidth;
			gv.GvMain.canvas.height = window.innerHeight;
			gv.GvMain.updateUI();
		};
		window.onkeydown = function(e2) {
			var _g = e2.keyCode;
			switch(_g) {
			case 37:
				gv.GvMain.autoMode = false;
				if(1 <= gv.GvMain.now) {
					--gv.GvMain.now;
					gv.GvMain.updateTime();
				}
				break;
			case 38:
				gv.GvMain.updateSelf(null,false,4,false,false);
				break;
			case 39:
				gv.GvMain.autoMode = false;
				if(gv.GvMain.timeList != null && gv.GvMain.now < gv.GvMain.timeList.length - 1) {
					++gv.GvMain.now;
					gv.GvMain.updateTime();
				}
				break;
			case 40:
				gv.GvMain.updateSelf(null,false,-4,false,false);
				break;
			case 97:
				gv.GvMain.onNumpadKey(-0.7,0.7);
				break;
			case 98:
				gv.GvMain.onNumpadKey(0,1);
				break;
			case 99:
				gv.GvMain.onNumpadKey(0.7,0.7);
				break;
			case 100:
				gv.GvMain.onNumpadKey(-1,0);
				break;
			case 102:
				gv.GvMain.onNumpadKey(1,0);
				break;
			case 103:
				gv.GvMain.onNumpadKey(-0.7,-0.7);
				break;
			case 104:
				gv.GvMain.onNumpadKey(0,-1);
				break;
			case 105:
				gv.GvMain.onNumpadKey(0.7,-0.7);
				break;
			}
		};
		var mouseDownFlag = false;
		window.onmousedown = function(e3) {
			mouseDownFlag = true;
			gv.GvMain.myMouseX = e3.x;
			gv.GvMain.myMouseY = e3.y;
			gv.GvMain.updateSelf(null,false,0,false,e3.shiftKey);
			return false;
		};
		window.onmouseup = function(e4) {
			mouseDownFlag = false;
			gv.GvMain.myMouseX = e4.x;
			gv.GvMain.myMouseY = e4.y;
			gv.GvMain.updateSelf(null,false,0,false,false);
			return false;
		};
		window.onmousemove = function(e5) {
			gv.GvMain.myMouseX = e5.x;
			gv.GvMain.myMouseY = e5.y;
			gv.GvMain.updateSelf(null,mouseDownFlag,0,false,false);
			return false;
		};
		window.onmousewheel = function(e6) {
			gv.GvMain.myMouseX = e6.x;
			gv.GvMain.myMouseY = e6.y;
			var wheel;
			if(0 < e6.detail) wheel = -1; else if(e6.detail < 0) wheel = 1; else wheel = 0;
			if(wheel == 0) {
				var wheelDelta = e6.wheelDelta;
				if(0 < wheelDelta) wheel = 1; else if(wheelDelta < 0) wheel = -1; else wheel = 0;
			}
			gv.GvMain.updateSelf(null,false,wheel,false,false);
			return false;
		};
		var beforeTouchX = null;
		var beforeTouchY = null;
		var beforeTouchD = null;
		var touchK = 12.425134878021496 / Math.log(2);
		var touchIds = new haxe.ds.IntMap();
		var touchFunc = function(e7) {
			if(1 <= e7.touches.length) {
				var _g1 = 0;
				var _g2 = e7.touches.length;
				while(_g1 < _g2) {
					var i = _g1++;
					var t = e7.touches.item(i);
					if(!touchIds.exists(t.identifier)) beforeTouchX = null;
				}
				var sumX = 0;
				var sumY = 0;
				var _g11 = 0;
				var _g3 = e7.touches.length;
				while(_g11 < _g3) {
					var i1 = _g11++;
					var t1 = e7.touches.item(i1);
					sumX += t1.pageX;
					sumY += t1.pageY;
				}
				var x = sumX / e7.touches.length;
				var y = sumY / e7.touches.length;
				var sumD = 0;
				var _g12 = 0;
				var _g4 = e7.touches.length;
				while(_g12 < _g4) {
					var i2 = _g12++;
					var t2 = e7.touches.item(i2);
					var dx = t2.pageX - x;
					var dy = t2.pageY - y;
					sumD += Math.sqrt(dx * dx + dy * dy + 0.00001);
				}
				var d = sumD / e7.touches.length;
				if(beforeTouchX != null) {
					var wheel1 = Math.log(d / beforeTouchD) * touchK;
					gv.GvMain.myMouseX = x;
					gv.GvMain.myMouseY = y;
					gv.GvMain.updateSelf(null,true,wheel1,false,false);
				}
				beforeTouchX = x;
				beforeTouchY = y;
				beforeTouchD = d;
			}
			touchIds = new haxe.ds.IntMap();
			var _g13 = 0;
			var _g5 = e7.touches.length;
			while(_g13 < _g5) {
				var i3 = _g13++;
				var t3 = e7.touches.item(i3);
				touchIds.set(t3.identifier,true);
			}
			e7.preventDefault();
			return false;
		};
		window.ontouchmove = touchFunc;
		window.ontouchstart = function(e8) {
			beforeTouchX = null;
			touchFunc(e8);
			return false;
		};
		window.ontouchcancel = function(e9) {
			beforeTouchX = null;
			e9.preventDefault();
			return false;
		};
		window.ontouchend = function(e10) {
			beforeTouchX = null;
			e10.preventDefault();
			return false;
		};
		Main.main();
		gv.GvMain.updateTimeList();
	};
};
gv.GvMain.onNumpadKey = function(dx,dy) {
	var newCx = Math.min(Math.max(-gv.GvMain.mx,gv.GvMain.cx + dx * gv.GvMain.scale * 0.25),gv.GvMain.mx);
	var newCy = Math.min(Math.max(-gv.GvMain.my,gv.GvMain.cy + dy * gv.GvMain.scale * 0.25),gv.GvMain.my);
	if(gv.GvMain.cx != newCx || gv.GvMain.cy != newCy) {
		gv.GvMain.cx = newCx;
		gv.GvMain.cy = newCy;
		gv.GvMain.updateUI();
	}
};
gv.GvMain.updateUI = function() {
	if(gv.GvMain.paintTimer != null) window.clearTimeout(gv.GvMain.paintTimer);
	gv.GvMain.paintTimer = window.setTimeout(gv.GvMain.paintSelf,10);
};
gv.GvMain.paintSelf = function() {
	gv.GvMain.paintTimer = null;
	gv.GvMain.updateSelf(gv.GvMain.ctx,false,0,false,false);
};
gv.GvMain.updateSelf = function(ctx,mouseDown,zoom,zoom2,shiftClick) {
	var width = Math.max(1,gv.GvMain.canvas.width);
	var height = Math.max(1,gv.GvMain.canvas.height);
	var dx = gv.GvCore.getMaxX() - gv.GvCore.getMinX();
	var dy = gv.GvCore.getMaxY() - gv.GvCore.getMinY();
	var maxD = Math.max(dx,dy);
	var scale;
	var sx;
	var sy;
	if(dx * height < dy * width) {
		gv.GvMain.my = (1 - gv.GvMain.scale) * 0.5;
		scale = height / (dy * gv.GvMain.scale);
		if(scale * dx <= width) gv.GvMain.mx = 0; else gv.GvMain.mx = (dx - width / scale) / maxD * 0.5;
	} else {
		gv.GvMain.mx = (1 - gv.GvMain.scale) * 0.5;
		scale = width / (dx * gv.GvMain.scale);
		if(scale * dy <= height) gv.GvMain.my = 0; else gv.GvMain.my = (dy - height / scale) / maxD * 0.5;
	}
	gv.GvMain.updateCenter();
	var beforeCursorX = gv.GvMain.cursorX;
	var beforeCursorY = gv.GvMain.cursorY;
	if(zoom2) {
		gv.GvMain.cx = (gv.GvMain.cursorX - (gv.GvMain.myMouseX - width * 0.5) / scale - dx * 0.5 - gv.GvCore.getMinX()) / maxD;
		gv.GvMain.cy = (gv.GvMain.cursorY - (gv.GvMain.myMouseY - height * 0.5) / scale - dy * 0.5 - gv.GvCore.getMinY()) / maxD;
		gv.GvMain.updateCenter();
		return;
	}
	gv.GvMain.cursorX = (gv.GvMain.myMouseX - width * 0.5) / scale + dx * 0.5 + gv.GvCore.getMinX() + maxD * gv.GvMain.cx;
	gv.GvMain.cursorY = (gv.GvMain.myMouseY - height * 0.5) / scale + dy * 0.5 + gv.GvCore.getMinY() + maxD * gv.GvMain.cy;
	if(mouseDown) {
		var dcx = gv.GvMain.cursorX - beforeCursorX;
		var dcy = gv.GvMain.cursorY - beforeCursorY;
		var oldCx = gv.GvMain.cx;
		var oldCy = gv.GvMain.cy;
		gv.GvMain.cx -= dcx / maxD;
		gv.GvMain.cy -= dcy / maxD;
		gv.GvMain.updateCenter();
		if(oldCx != gv.GvMain.cx || oldCy != gv.GvMain.cy) {
			if(zoom != 0) {
				gv.GvMain.cursorX = (gv.GvMain.myMouseX - width * 0.5) / scale + dx * 0.5 + gv.GvCore.getMinX() + maxD * gv.GvMain.cx;
				gv.GvMain.cursorY = (gv.GvMain.myMouseY - height * 0.5) / scale + dy * 0.5 + gv.GvCore.getMinY() + maxD * gv.GvMain.cy;
				var newScale = Math.min(Math.max(0.01,gv.GvMain.scale * Math.pow(0.5,zoom * 0.080482023721841)),1.0);
				if(gv.GvMain.scale != newScale) {
					gv.GvMain.scale = newScale;
					gv.GvMain.updateSelf(null,false,0,true,false);
				}
			}
			gv.GvMain.updateUI();
			return;
		}
	}
	if(zoom != 0) {
		var newScale1 = Math.min(Math.max(0.01,gv.GvMain.scale * Math.pow(0.5,zoom * 0.080482023721841)),1.0);
		if(gv.GvMain.scale != newScale1) {
			gv.GvMain.scale = newScale1;
			gv.GvMain.updateSelf(null,false,0,true,false);
			gv.GvMain.updateUI();
			return;
		}
	}
	if(gv.GvMain.nowSnap == null) return;
	var time = gv.GvMain.nowSnap.getTime();
	if(shiftClick) gv.GvCore.sendInput(time,gv.GvMain.cursorX,gv.GvMain.cursorY);
	var title;
	if(0 <= gv.GvMain.myMouseX && 0 <= gv.GvMain.myMouseY && gv.GvCore.getMinX() <= gv.GvMain.cursorX && gv.GvMain.cursorX <= gv.GvCore.getMaxX() && gv.GvCore.getMinY() <= gv.GvMain.cursorY && gv.GvMain.cursorY <= gv.GvCore.getMaxY()) title = "time " + time + " ( " + (gv.GvMain.now + 1) + " / " + gv.GvMain.timeList.length + " ) (" + (gv.GvMain.cursorX + 0.5 | 0) + ", " + (gv.GvMain.cursorY + 0.5 | 0) + ") (" + gv.GvMain.cursorX + ", " + gv.GvMain.cursorY + ")"; else title = "time " + time + " ( " + (gv.GvMain.now + 1) + " / " + gv.GvMain.timeList.length + " )";
	sx = (width / scale - dx) * 0.5 - gv.GvCore.getMinX() - maxD * gv.GvMain.cx;
	sy = (height / scale - dy) * 0.5 - gv.GvCore.getMinY() - maxD * gv.GvMain.cy;
	if(ctx != null) {
		ctx.clearRect(0,0,width,height);
		ctx.save();
		ctx.scale(scale,scale);
		ctx.translate(sx,sy);
		gv.GvMain.nowSnap.paint(ctx);
		ctx.restore();
	}
};
gv.GvMain.updateCenter = function() {
	gv.GvMain.cx = Math.min(Math.max(-gv.GvMain.mx,gv.GvMain.cx),gv.GvMain.mx);
	gv.GvMain.cy = Math.min(Math.max(-gv.GvMain.my,gv.GvMain.cy),gv.GvMain.my);
};
gv.GvMain.updateTime = function() {
	if(gv.GvMain.timeList != null && gv.GvMain.now < gv.GvMain.timeList.length) {
		var time = gv.GvMain.timeList[gv.GvMain.now];
		if(gv.GvMain.now == gv.GvMain.timeList.length - 1) gv.GvMain.autoMode = true;
		gv.GvMain.nowSnap = gv.GvCore.getSnap(time);
		gv.GvMain.nowSnap.output();
		gv.GvMain.updateUI();
		var amc = gv.GvCore.getAutoModeCount();
		if(amc != gv.GvMain.autoModeCount) {
			gv.GvMain.autoModeCount = amc;
			gv.GvMain.autoMode = true;
		}
		if(gv.GvMain.autoMode) {
		}
		return;
	}
	gv.GvMain.nowSnap = null;
};
gv.GvMain.updateTimeList = function() {
	var nowTime;
	if(gv.GvMain.timeList != null && gv.GvMain.now < gv.GvMain.timeList.length) nowTime = gv.GvMain.timeList[gv.GvMain.now]; else nowTime = 0.0;
	gv.GvMain.timeList = gv.GvCore.getTimeList();
	if(gv.GvMain.timeList != null && 0 < gv.GvMain.timeList.length) {
		var minDiff = Math.abs(nowTime - gv.GvMain.timeList[0]);
		gv.GvMain.now = 0;
		var _g1 = 1;
		var _g = gv.GvMain.timeList.length;
		while(_g1 < _g) {
			var i = _g1++;
			var diff = Math.abs(nowTime - gv.GvMain.timeList[i]);
			if(diff < minDiff) {
				minDiff = diff;
				gv.GvMain.now = i;
			}
		}
		gv.GvMain.updateTime();
	}
};
gv.GvSnap = function(time) {
	this.time = time;
	this.items = new List();
};
gv.GvSnap.prototype = {
	addItem: function(item) {
		this.items.add(item);
	}
	,paint: function(ctx) {
		var $it0 = this.items.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			item.paint(ctx);
		}
	}
	,output: function() {
		var $it0 = this.items.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			item.output();
		}
	}
	,getTime: function() {
		return this.time;
	}
};
gv.GvSnapItem = function() { };
gv.GvSnapItem_Circle = function(x_,y_,r_) {
	this.x = x_;
	this.y = y_;
	this.r = r_;
	this.colorR = 0;
	this.colorG = 0;
	this.colorB = 0;
};
gv.GvSnapItem_Circle.__interfaces__ = [gv.GvSnapItem];
gv.GvSnapItem_Circle.prototype = {
	rgb: function(r,g,b) {
		this.colorR = r / 255.0;
		this.colorG = g / 255.0;
		this.colorB = b / 255.0;
		return this;
	}
	,color: function(cIdx) {
		var rgb = gv.GvCore.gvGetColorFromIndex(cIdx);
		this.colorR = rgb[0];
		this.colorG = rgb[1];
		this.colorB = rgb[2];
		return this;
	}
	,getMinX: function() {
		return this.x - this.r;
	}
	,getMinY: function() {
		return this.y - this.r;
	}
	,getMaxX: function() {
		return this.x + this.r;
	}
	,getMaxY: function() {
		return this.y + this.r;
	}
	,paint: function(ctx) {
		ctx.setFillColor(this.colorR,this.colorG,this.colorB,1.0);
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2 * Math.PI,false);
		ctx.fill();
	}
	,output: function() {
	}
};
var haxe = {};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
gv.Gv.enable_ = true;
gv.GvCore.nowTime = 0;
gv.GvCore.maxTime = 0;
gv.GvCore.minX = 0;
gv.GvCore.minY = 0;
gv.GvCore.maxX = 1;
gv.GvCore.maxY = 1;
gv.GvCore.emptyFlag = true;
gv.GvCore.snapMap = new haxe.ds.IntMap();
gv.GvCore.autoModeCount = 1;
gv.GvCore.colors = [[1,0,0],[0,1,0],[0,0,1],[1,1,0],[0,1,1],[1,0,1],[1,0.5,0],[1,0,0.5]];
gv.GvMain.now = 0;
gv.GvMain.scale = 1.0;
gv.GvMain.cx = 0.0;
gv.GvMain.cy = 0.0;
gv.GvMain.mx = 0.0;
gv.GvMain.my = 0.0;
gv.GvMain.cursorX = 0.0;
gv.GvMain.cursorY = 0.0;
gv.GvMain.myMouseX = 0;
gv.GvMain.myMouseY = 0;
gv.GvMain.autoMode = false;
gv.GvMain.autoModeCount = 0;
gv.GvMain.main();
})();
