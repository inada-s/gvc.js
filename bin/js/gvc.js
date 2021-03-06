/*
 * Copyright (c) 2014, Yasunobu Imamura
 * This program generated by haXe.
 * So, this program include haXe libraries.
 * haXe-libraries's License is following.
 *
 * Copyright (c) 2005, The haXe Project Contributors
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE HAXE PROJECT CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE HAXE PROJECT CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 */
(function (console, $hx_exports, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
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
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var gv_Gv = function() { };
gv_Gv.__name__ = true;
gv_Gv.newTime = $hx_exports.n = function(time) {
	gv_GvCore.newTime(time);
};
gv_Gv.circle = $hx_exports.c = function(x,y,r) {
	if(r == null) r = 0.5;
	var ret = new gv_GvSnapItem_$Circle(x,y,r);
	gv_GvCore.addItem(ret);
	return ret;
};
gv_Gv.text = $hx_exports.t = function(text,x,y,r) {
	if(r == null) r = 0.5;
	var ret = new gv_GvSnapItem_$Text(text,x,y,r);
	gv_GvCore.addItem(ret);
	return ret;
};
gv_Gv.polygon = $hx_exports.p = function() {
	var arg = arguments;
	var ret = new gv_GvSnapItem_$Polygon();
	var _g1 = 0;
	var _g;
	_g = js_Boot.__cast(arg.length / 2 , Int);
	while(_g1 < _g) {
		var i = _g1++;
		ret.add(arg[i * 2],arg[i * 2 + 1]);
	}
	gv_GvCore.addItem(ret);
	return ret;
};
gv_Gv.line = $hx_exports.l = function(fromX,fromY,toX,toY,r) {
	if(r == null) r = 0.5;
	var ret = new gv_GvSnapItem_$Polygon();
	var odx = toX - fromX;
	var ody = toY - fromY;
	var rate = r / Math.sqrt(odx * odx + ody * ody);
	var dx = odx * rate;
	var dy = ody * rate;
	ret.add(toX + dy * (0.05 / (1 + Math.sqrt(2))),toY + dx * (0.05 / (1 + Math.sqrt(2))));
	ret.add(toX - dx * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) - dy * 0.05,toY - dy * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) + dx * 0.05);
	ret.add(fromX + dx * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) - dy * 0.05,fromY + dy * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) + dx * 0.05);
	ret.add(fromX - dy * (0.05 / (1 + Math.sqrt(2))),fromY + dx * (0.05 / (1 + Math.sqrt(2))));
	ret.add(fromX + dy * (0.05 / (1 + Math.sqrt(2))),fromY - dx * (0.05 / (1 + Math.sqrt(2))));
	ret.add(fromX + dx * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) + dy * 0.05,fromY + dy * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) - dx * 0.05);
	ret.add(toX - dx * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) + dy * 0.05,toY - dy * (0.05 * Math.sqrt(2) / (1 + Math.sqrt(2))) - dx * 0.05);
	ret.add(toX + dy * (0.05 / (1 + Math.sqrt(2))),toY - dx * (0.05 / (1 + Math.sqrt(2))));
	gv_GvCore.addItem(ret);
	return ret;
};
gv_Gv.out = $hx_exports.o = function(line) {
	gv_GvCore.addOut(line);
};
gv_Gv.autoMode = $hx_exports.a = function() {
	gv_GvCore.autoMode();
};
var gv_GvCore = function() { };
gv_GvCore.__name__ = true;
gv_GvCore.newTime = function(time) {
	if(time == null) gv_GvCore.nowTime = Std["int"](0.1 + Math.max(0,gv_GvCore.maxTime + 1)); else {
		gv_GvCore.maxTime = Std["int"](0.1 + Math.max(gv_GvCore.maxTime,time));
		gv_GvCore.nowTime = time;
	}
};
gv_GvCore.addItem = function(item) {
	if(gv_GvCore.emptyFlag) {
		gv_GvCore.emptyFlag = false;
		gv_GvCore.minX = item.getMinX();
		gv_GvCore.minY = item.getMinY();
		gv_GvCore.maxX = item.getMaxX();
		gv_GvCore.maxY = item.getMaxY();
		gv_GvCore.maxTime = gv_GvCore.nowTime;
	} else {
		gv_GvCore.minX = Math.min(gv_GvCore.minX,item.getMinX());
		gv_GvCore.minY = Math.min(gv_GvCore.minY,item.getMinY());
		gv_GvCore.maxX = Math.max(gv_GvCore.maxX,item.getMaxX());
		gv_GvCore.maxY = Math.max(gv_GvCore.maxY,item.getMaxY());
		gv_GvCore.maxTime = Std["int"](0.1 + Math.max(gv_GvCore.maxTime,gv_GvCore.nowTime));
	}
	if(gv_GvCore.snapMap.h.hasOwnProperty(gv_GvCore.nowTime)) {
		var snap = gv_GvCore.snapMap.h[gv_GvCore.nowTime];
		snap.addItem(item);
	} else {
		var snap1 = new gv_GvSnap(gv_GvCore.nowTime);
		gv_GvCore.snapMap.h[gv_GvCore.nowTime] = snap1;
		snap1.addItem(item);
	}
};
gv_GvCore.addOut = function(line) {
	if(gv_GvCore.outMap.h.hasOwnProperty(gv_GvCore.nowTime)) {
		var before = gv_GvCore.outMap.h[gv_GvCore.nowTime];
		gv_GvCore.outMap.h[gv_GvCore.nowTime] = "" + before + line + "\n";
	} else gv_GvCore.outMap.h[gv_GvCore.nowTime] = "" + line + "\n";
};
gv_GvCore.getMinX = function() {
	return gv_GvCore.minX;
};
gv_GvCore.getMinY = function() {
	return gv_GvCore.minY;
};
gv_GvCore.getMaxX = function() {
	return gv_GvCore.maxX;
};
gv_GvCore.getMaxY = function() {
	return gv_GvCore.maxY;
};
gv_GvCore.getTimeList = function() {
	var ret = [];
	var $it0 = gv_GvCore.snapMap.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		ret.push(k);
	}
	return ret;
};
gv_GvCore.getSnap = function(time) {
	return gv_GvCore.snapMap.h[time];
};
gv_GvCore.getOut = function(time) {
	if(gv_GvCore.outMap.h.hasOwnProperty(time)) return gv_GvCore.outMap.h[time]; else return "";
};
gv_GvCore.getAutoModeCount = function() {
	return gv_GvCore.autoModeCount;
};
gv_GvCore.sendInput = function(time,x,y) {
	if(gv_GvCore.inputInt_ != null) {
		var func = gv_GvCore.inputInt_;
		gv_GvCore.inputInt_ = null;
		func(time,Math.round(x),Math.round(y));
	} else if(gv_GvCore.inputFloat_ != null) {
		var func1 = gv_GvCore.inputFloat_;
		gv_GvCore.inputFloat_ = null;
		func1(time,x,y);
	}
};
gv_GvCore.gvGetColorFromIndex = function(idx) {
	return gv_GvCore.colors[idx];
};
gv_GvCore.inputInt = function(callback) {
	gv_GvCore.inputInt_ = callback;
	gv_GvCore.inputFloat_ = null;
};
gv_GvCore.inputFloat = function(callback) {
	gv_GvCore.inputFloat_ = callback;
	gv_GvCore.inputInt_ = null;
};
gv_GvCore.setDragModeInt = function(start,move,end) {
	gv_GvCore.dragStartInt_ = start;
	gv_GvCore.dragStartFloat_ = null;
	gv_GvCore.dragMoveInt_ = move;
	gv_GvCore.dragMoveFloat_ = null;
	gv_GvCore.dragEnd_ = end;
};
gv_GvCore.setDragModeFloat = function(start,move,end) {
	gv_GvCore.dragStartInt_ = start;
	gv_GvCore.dragStartFloat_ = null;
	gv_GvCore.dragMoveInt_ = move;
	gv_GvCore.dragMoveFloat_ = null;
	gv_GvCore.dragEnd_ = end;
};
gv_GvCore.isDragMode = function() {
	return gv_GvCore.dragStartInt_ != null || gv_GvCore.dragStartFloat_ != null;
};
gv_GvCore.isNowDrag = function() {
	return gv_GvCore.nowDragFlag;
};
gv_GvCore.sendDragStart = function(time,x,y) {
	gv_GvCore.sendDragEnd();
	if(gv_GvCore.dragStartInt_ != null) {
		var func = gv_GvCore.dragStartInt_;
		gv_GvCore.nowDragFlag = true;
		func(time,Math.round(x),Math.round(y));
	} else if(gv_GvCore.dragStartFloat_ != null) {
		var func1 = gv_GvCore.dragStartFloat_;
		gv_GvCore.nowDragFlag = true;
		func1(time,x,y);
	}
};
gv_GvCore.sendDragMove = function(time,x,y) {
	if(gv_GvCore.nowDragFlag) {
		if(gv_GvCore.dragMoveInt_ != null) {
			var func = gv_GvCore.dragMoveInt_;
			func(Math.round(x),Math.round(y));
		} else if(gv_GvCore.dragMoveFloat_ != null) {
			var func1 = gv_GvCore.dragMoveFloat_;
			func1(x,y);
		}
	}
};
gv_GvCore.sendDragEnd = function() {
	if(gv_GvCore.nowDragFlag) {
		if(gv_GvCore.dragEnd_ != null) {
			var func = gv_GvCore.dragEnd_;
			func();
		}
		gv_GvCore.nowDragFlag = false;
	}
};
gv_GvCore.autoMode = function() {
	++gv_GvCore.autoModeCount;
};
gv_GvCore.rgb = function(r,g,b,a) {
	if(a == null) a = 1.0;
	return "rgba(" + r * 100 + "%, " + g * 100 + "%, " + b * 100 + "%, " + a;
};
var gv_GvMain = function() { };
gv_GvMain.__name__ = true;
gv_GvMain.main = function() {
	window.onload = function(e) {
		gv_GvMain.canvas = window.document.createElement("canvas");
		window.document.body.appendChild(gv_GvMain.canvas);
		gv_GvMain.canvas.style.position = "absolute";
		gv_GvMain.canvas.style.left = "0px";
		gv_GvMain.canvas.style.top = "0px";
		gv_GvMain.canvas.style.width = "100%";
		gv_GvMain.canvas.style.height = "100%";
		gv_GvMain.canvas.width = window.innerWidth;
		gv_GvMain.canvas.height = window.innerHeight;
		gv_GvMain.ctx = gv_GvMain.canvas.getContext("2d",null);
		gv_GvMain.div = window.document.createElement("pre");
		window.document.body.appendChild(gv_GvMain.div);
		gv_GvMain.div.style.position = "absolute";
		gv_GvMain.div.style.left = "0px";
		gv_GvMain.div.style.bottom = "0px";
		window.onresize = function(e2) {
			gv_GvMain.canvas.width = window.innerWidth;
			gv_GvMain.canvas.height = window.innerHeight;
			gv_GvMain.updateUI();
		};
		window.onkeydown = function(e3) {
			var _g5 = e3.keyCode;
			switch(_g5) {
			case 33:
				gv_GvMain.autoMode = false;
				if(1 <= gv_GvMain.now) {
					gv_GvMain.now = Std["int"](Math.max(0,gv_GvMain.now - Std["int"](Math.max(10,Math.sqrt(gv_GvMain.timeList.length)))));
					gv_GvMain.updateTime();
				}
				break;
			case 34:
				gv_GvMain.autoMode = false;
				if(gv_GvMain.timeList != null && gv_GvMain.now < gv_GvMain.timeList.length - 1) {
					gv_GvMain.now = Std["int"](Math.min(gv_GvMain.now + Math.max(10,Std["int"](Math.sqrt(gv_GvMain.timeList.length))),gv_GvMain.timeList.length - 1));
					gv_GvMain.updateTime();
				}
				break;
			case 35:
				gv_GvMain.autoMode = false;
				if(gv_GvMain.timeList != null && gv_GvMain.now < gv_GvMain.timeList.length - 1) {
					gv_GvMain.now = gv_GvMain.timeList.length - 1;
					gv_GvMain.updateTime();
				}
				break;
			case 36:
				gv_GvMain.autoMode = false;
				if(1 <= gv_GvMain.now) {
					gv_GvMain.now = 0;
					gv_GvMain.updateTime();
				}
				break;
			case 37:
				gv_GvMain.autoMode = false;
				if(1 <= gv_GvMain.now) {
					--gv_GvMain.now;
					gv_GvMain.updateTime();
				}
				break;
			case 38:
				gv_GvMain.updateSelf(null,false,4,false,false);
				break;
			case 39:
				gv_GvMain.autoMode = false;
				if(gv_GvMain.timeList != null && gv_GvMain.now < gv_GvMain.timeList.length - 1) {
					++gv_GvMain.now;
					gv_GvMain.updateTime();
				}
				break;
			case 40:
				gv_GvMain.updateSelf(null,false,-4,false,false);
				break;
			case 97:
				gv_GvMain.onNumpadKey(-0.7,0.7);
				break;
			case 98:
				gv_GvMain.onNumpadKey(0,1);
				break;
			case 99:
				gv_GvMain.onNumpadKey(0.7,0.7);
				break;
			case 100:
				gv_GvMain.onNumpadKey(-1,0);
				break;
			case 102:
				gv_GvMain.onNumpadKey(1,0);
				break;
			case 103:
				gv_GvMain.onNumpadKey(-0.7,-0.7);
				break;
			case 104:
				gv_GvMain.onNumpadKey(0,-1);
				break;
			case 105:
				gv_GvMain.onNumpadKey(0.7,-0.7);
				break;
			}
		};
		var mouseDownFlag = false;
		window.onmousedown = function(e4) {
			mouseDownFlag = true;
			gv_GvMain.myMouseX = e4.clientX;
			gv_GvMain.myMouseY = e4.clientY;
			gv_GvMain.updateSelf(null,false,0,false,e4.shiftKey);
			return false;
		};
		window.onmouseup = function(e5) {
			mouseDownFlag = false;
			gv_GvMain.myMouseX = e5.clientX;
			gv_GvMain.myMouseY = e5.clientY;
			gv_GvMain.updateSelf(null,false,0,false,false);
			if(gv_GvCore.isDragMode()) {
				if(gv_GvCore.isNowDrag()) {
					gv_GvCore.sendDragEnd();
					gv_GvMain.updateTimeList();
				}
			}
			return false;
		};
		window.onmousemove = function(e6) {
			gv_GvMain.myMouseX = e6.clientX;
			gv_GvMain.myMouseY = e6.clientY;
			gv_GvMain.updateSelf(null,mouseDownFlag,0,false,false);
			return false;
		};
		window.onwheel = function(e7) {
			gv_GvMain.myMouseX = e7.clientX;
			gv_GvMain.myMouseY = e7.clientY;
			var wheel1;
			if(0 < e7.detail) wheel1 = -1; else if(e7.detail < 0) wheel1 = 1; else wheel1 = 0;
			if(wheel1 == 0) {
				var wheelDelta = e7.wheelDelta;
				if(0 < wheelDelta) wheel1 = 1; else if(wheelDelta < 0) wheel1 = -1; else wheel1 = 0;
			}
			gv_GvMain.updateSelf(null,false,wheel1,false,false);
			return false;
		};
		var beforeTouchX = null;
		var beforeTouchY = null;
		var beforeTouchD = null;
		var baseNow = 0;
		var beforeTouchLength = 0;
		var touchK = 12.425134878021496 / Math.log(2);
		var touchIds = new haxe_ds_IntMap();
		var touchFunc = function(e1) {
			if(beforeTouchLength != e1.touches.length) beforeTouchX = null;
			beforeTouchLength = e1.touches.length;
			if(1 <= e1.touches.length) {
				var _g1 = 0;
				var _g = e1.touches.length;
				while(_g1 < _g) {
					var i = _g1++;
					var t = e1.touches.item(i);
					if(!touchIds.h.hasOwnProperty(t.identifier)) beforeTouchX = null;
				}
				var sumX = 0;
				var sumY = 0;
				var _g11 = 0;
				var _g2 = e1.touches.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					var t1 = e1.touches.item(i1);
					sumX += t1.pageX;
					sumY += t1.pageY;
				}
				var x = sumX / e1.touches.length;
				var y = sumY / e1.touches.length;
				var sumD = 0;
				var _g12 = 0;
				var _g3 = e1.touches.length;
				while(_g12 < _g3) {
					var i2 = _g12++;
					var t2 = e1.touches.item(i2);
					var dx = t2.pageX - x;
					var dy = t2.pageY - y;
					sumD += Math.sqrt(dx * dx + dy * dy + 0.00001);
				}
				var d = sumD / e1.touches.length;
				if(beforeTouchX != null) {
					if(3 <= e1.touches.length) {
						gv_GvMain.autoMode = false;
						var fPos = 10.0 * (x - beforeTouchX) / gv_GvMain.canvas.width;
						var newNow;
						newNow = baseNow - (0 <= fPos?Math.floor(fPos):Math.ceil(fPos));
						if(newNow != gv_GvMain.now && gv_GvMain.timeList != null && 0 <= newNow && newNow < gv_GvMain.timeList.length) {
							gv_GvMain.now = newNow;
							gv_GvMain.updateTime();
						}
					} else if(2 == e1.touches.length) {
						var wheel = Math.log(d / beforeTouchD) * touchK;
						gv_GvMain.myMouseX = x;
						gv_GvMain.myMouseY = y;
						gv_GvMain.updateSelf(null,false,wheel,false,false);
						beforeTouchX = x;
						beforeTouchY = y;
						beforeTouchD = d;
					} else if(1 == e1.touches.length) {
						gv_GvMain.myMouseX = x;
						gv_GvMain.myMouseY = y;
						gv_GvMain.updateSelf(null,true,0,false,false);
						beforeTouchX = x;
						beforeTouchY = y;
						beforeTouchD = d;
					}
				} else {
					gv_GvMain.myMouseX = x;
					gv_GvMain.myMouseY = y;
					gv_GvMain.updateSelf(null,false,0,false,false);
					beforeTouchX = x;
					beforeTouchY = y;
					beforeTouchD = d;
					baseNow = gv_GvMain.now;
				}
			}
			touchIds = new haxe_ds_IntMap();
			var _g13 = 0;
			var _g4 = e1.touches.length;
			while(_g13 < _g4) {
				var i3 = _g13++;
				var t3 = e1.touches.item(i3);
				touchIds.h[t3.identifier] = true;
			}
			e1.preventDefault();
			return false;
		};
		window.ontouchmove = touchFunc;
		var doubleTouchX = null;
		var doubleTouchY = null;
		var doubleTouchTime = null;
		var secondTimeBase = HxOverrides.strDate("2000-01-01 00:00:01").getTime() - HxOverrides.strDate("2000-01-01 00:00:00").getTime();
		window.ontouchstart = function(e8) {
			beforeTouchX = null;
			if(e8.touches.length == 1) {
				var x1 = e8.touches.item(0).pageX;
				var y1 = e8.touches.item(0).pageY;
				var now = new Date().getTime();
				if(doubleTouchTime != null && now - doubleTouchTime <= secondTimeBase * 0.5) {
					var dx1 = x1 - doubleTouchX;
					var dy1 = y1 - doubleTouchY;
					var d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
					if(d1 <= Math.min(gv_GvMain.canvas.width,gv_GvMain.canvas.height) * 0.05) {
						gv_GvMain.myMouseX = x1;
						gv_GvMain.myMouseY = y1;
						gv_GvMain.updateSelf(null,false,0,false,true);
						e8.preventDefault();
						return false;
					}
				}
				doubleTouchX = x1;
				doubleTouchY = y1;
				doubleTouchTime = now;
			}
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
			if(e10.targetTouches.length == e10.touches.length) {
				if(gv_GvCore.isDragMode()) {
					if(gv_GvCore.isNowDrag()) {
						gv_GvCore.sendDragEnd();
						gv_GvMain.updateTimeList();
					}
				}
			}
			return false;
		};
		gv_GvMain.updateTimeList();
	};
};
gv_GvMain.onNumpadKey = function(dx,dy) {
	var newCx = Math.min(Math.max(-gv_GvMain.mx,gv_GvMain.cx + dx * gv_GvMain.scale * 0.25),gv_GvMain.mx);
	var newCy = Math.min(Math.max(-gv_GvMain.my,gv_GvMain.cy + dy * gv_GvMain.scale * 0.25),gv_GvMain.my);
	if(gv_GvMain.cx != newCx || gv_GvMain.cy != newCy) {
		gv_GvMain.cx = newCx;
		gv_GvMain.cy = newCy;
		gv_GvMain.updateUI();
	}
};
gv_GvMain.updateUI = function() {
	if(gv_GvMain.paintTimer != null) window.clearTimeout(gv_GvMain.paintTimer);
	gv_GvMain.paintTimer = window.setTimeout(gv_GvMain.paintSelf,10);
};
gv_GvMain.paintSelf = function() {
	gv_GvMain.paintTimer = null;
	gv_GvMain.updateSelf(gv_GvMain.ctx,false,0,false,false);
};
gv_GvMain.updateSelf = function(ctx,mouseDown,zoom,zoom2,shiftClick) {
	var width = Math.max(1,gv_GvMain.canvas.width);
	var height = Math.max(1,gv_GvMain.canvas.height);
	var dx = gv_GvCore.getMaxX() - gv_GvCore.getMinX();
	var dy = gv_GvCore.getMaxY() - gv_GvCore.getMinY();
	var maxD = Math.max(dx,dy);
	var scale;
	var sx;
	var sy;
	if(dx * height < dy * width) {
		gv_GvMain.my = (1 - gv_GvMain.scale) * 0.5;
		scale = height / (dy * gv_GvMain.scale);
		if(scale * dx <= width) gv_GvMain.mx = 0; else gv_GvMain.mx = (dx - width / scale) / maxD * 0.5;
	} else {
		gv_GvMain.mx = (1 - gv_GvMain.scale) * 0.5;
		scale = width / (dx * gv_GvMain.scale);
		if(scale * dy <= height) gv_GvMain.my = 0; else gv_GvMain.my = (dy - height / scale) / maxD * 0.5;
	}
	gv_GvMain.updateCenter();
	var beforeCursorX = gv_GvMain.cursorX;
	var beforeCursorY = gv_GvMain.cursorY;
	if(zoom2) {
		gv_GvMain.cx = (gv_GvMain.cursorX - (gv_GvMain.myMouseX - width * 0.5) / scale - dx * 0.5 - gv_GvCore.getMinX()) / maxD;
		gv_GvMain.cy = (gv_GvMain.cursorY - (gv_GvMain.myMouseY - height * 0.5) / scale - dy * 0.5 - gv_GvCore.getMinY()) / maxD;
		gv_GvMain.updateCenter();
		return;
	}
	gv_GvMain.cursorX = (gv_GvMain.myMouseX - width * 0.5) / scale + dx * 0.5 + gv_GvCore.getMinX() + maxD * gv_GvMain.cx;
	gv_GvMain.cursorY = (gv_GvMain.myMouseY - height * 0.5) / scale + dy * 0.5 + gv_GvCore.getMinY() + maxD * gv_GvMain.cy;
	if(gv_GvMain.nowSnap == null) return;
	var time = gv_GvMain.nowSnap.getTime();
	if(mouseDown) {
		if(gv_GvCore.isDragMode()) {
			if(!gv_GvCore.isNowDrag()) gv_GvCore.sendDragStart(time,beforeCursorX,beforeCursorY);
			gv_GvCore.sendDragMove(time,gv_GvMain.cursorX,gv_GvMain.cursorY);
			gv_GvMain.updateTimeList();
		} else {
			var dcx = gv_GvMain.cursorX - beforeCursorX;
			var dcy = gv_GvMain.cursorY - beforeCursorY;
			var oldCx = gv_GvMain.cx;
			var oldCy = gv_GvMain.cy;
			gv_GvMain.cx -= dcx / maxD;
			gv_GvMain.cy -= dcy / maxD;
			gv_GvMain.updateCenter();
			if(oldCx != gv_GvMain.cx || oldCy != gv_GvMain.cy) {
				if(zoom != 0) {
					gv_GvMain.cursorX = (gv_GvMain.myMouseX - width * 0.5) / scale + dx * 0.5 + gv_GvCore.getMinX() + maxD * gv_GvMain.cx;
					gv_GvMain.cursorY = (gv_GvMain.myMouseY - height * 0.5) / scale + dy * 0.5 + gv_GvCore.getMinY() + maxD * gv_GvMain.cy;
					var newScale = Math.min(Math.max(0.01,gv_GvMain.scale * Math.pow(0.5,zoom * 0.080482023721841)),1.0);
					if(gv_GvMain.scale != newScale) {
						gv_GvMain.scale = newScale;
						gv_GvMain.updateSelf(null,false,0,true,false);
					}
				}
				gv_GvMain.updateUI();
				return;
			}
		}
	}
	if(zoom != 0) {
		var newScale1 = Math.min(Math.max(0.01,gv_GvMain.scale * Math.pow(0.5,zoom * 0.080482023721841)),1.0);
		if(gv_GvMain.scale != newScale1) {
			gv_GvMain.scale = newScale1;
			gv_GvMain.updateSelf(null,false,0,true,false);
			gv_GvMain.updateUI();
			return;
		}
	}
	if(shiftClick) {
		gv_GvCore.sendInput(time,gv_GvMain.cursorX,gv_GvMain.cursorY);
		gv_GvMain.updateTimeList();
	}
	var out = gv_GvCore.getOut(time);
	if(0 <= gv_GvMain.myMouseX && 0 <= gv_GvMain.myMouseY && gv_GvCore.getMinX() <= gv_GvMain.cursorX && gv_GvMain.cursorX <= gv_GvCore.getMaxX() && gv_GvCore.getMinY() <= gv_GvMain.cursorY && gv_GvMain.cursorY <= gv_GvCore.getMaxY()) gv_GvMain.div.textContent = "" + out + "time " + time + " ( " + (gv_GvMain.now + 1) + " / " + gv_GvMain.timeList.length + " ) (" + (gv_GvMain.cursorX + 0.5 | 0) + ", " + (gv_GvMain.cursorY + 0.5 | 0) + ") (" + gv_GvMain.cursorX + ", " + gv_GvMain.cursorY + ")"; else gv_GvMain.div.textContent = "" + out + "time " + time + " ( " + (gv_GvMain.now + 1) + " / " + gv_GvMain.timeList.length + " )";
	sx = (width / scale - dx) * 0.5 - gv_GvCore.getMinX() - maxD * gv_GvMain.cx;
	sy = (height / scale - dy) * 0.5 - gv_GvCore.getMinY() - maxD * gv_GvMain.cy;
	if(ctx != null) {
		ctx.clearRect(0,0,width,height);
		ctx.save();
		ctx.scale(scale,scale);
		ctx.translate(sx,sy);
		gv_GvMain.nowSnap.paint(ctx);
		ctx.restore();
	}
};
gv_GvMain.updateCenter = function() {
	gv_GvMain.cx = Math.min(Math.max(-gv_GvMain.mx,gv_GvMain.cx),gv_GvMain.mx);
	gv_GvMain.cy = Math.min(Math.max(-gv_GvMain.my,gv_GvMain.cy),gv_GvMain.my);
};
gv_GvMain.setAutoModeTimer = function() {
	if(gv_GvMain.autoModeTimerId != null) window.clearTimeout(gv_GvMain.autoModeTimerId);
	gv_GvMain.autoModeTimerId = window.setTimeout(gv_GvMain.onAutoModeTimer,200);
};
gv_GvMain.onAutoModeTimer = function() {
	if(gv_GvMain.autoModeTimerId != null) {
		window.clearTimeout(gv_GvMain.autoModeTimerId);
		gv_GvMain.autoModeTimerId = null;
	}
	if(gv_GvMain.timeList != null && gv_GvMain.now < gv_GvMain.timeList.length - 1) {
		++gv_GvMain.now;
		gv_GvMain.updateTime();
		gv_GvMain.setAutoModeTimer();
	}
};
gv_GvMain.updateTime = function() {
	if(gv_GvMain.timeList != null && gv_GvMain.now < gv_GvMain.timeList.length) {
		var time = gv_GvMain.timeList[gv_GvMain.now];
		if(gv_GvMain.now == gv_GvMain.timeList.length - 1) gv_GvMain.autoMode = true;
		gv_GvMain.nowSnap = gv_GvCore.getSnap(time);
		gv_GvMain.nowSnap.output();
		gv_GvMain.updateUI();
		var amc = gv_GvCore.getAutoModeCount();
		if(amc != gv_GvMain.autoModeCount) {
			gv_GvMain.autoModeCount = amc;
			gv_GvMain.autoMode = true;
		}
		if(gv_GvMain.autoMode) gv_GvMain.setAutoModeTimer();
		return;
	}
	gv_GvMain.nowSnap = null;
};
gv_GvMain.updateTimeList = function() {
	var nowTime;
	if(gv_GvMain.timeList != null && gv_GvMain.now < gv_GvMain.timeList.length) nowTime = gv_GvMain.timeList[gv_GvMain.now]; else nowTime = 0.0;
	gv_GvMain.timeList = gv_GvCore.getTimeList();
	if(gv_GvMain.timeList != null && 0 < gv_GvMain.timeList.length) {
		var minDiff = Math.abs(nowTime - gv_GvMain.timeList[0]);
		gv_GvMain.now = 0;
		var _g1 = 1;
		var _g = gv_GvMain.timeList.length;
		while(_g1 < _g) {
			var i = _g1++;
			var diff = Math.abs(nowTime - gv_GvMain.timeList[i]);
			if(diff < minDiff) {
				minDiff = diff;
				gv_GvMain.now = i;
			}
		}
		gv_GvMain.updateTime();
	}
};
var gv_GvSnap = function(time) {
	this.time = time;
	this.items = new List();
};
gv_GvSnap.__name__ = true;
gv_GvSnap.prototype = {
	addItem: function(item) {
		this.items.add(item);
	}
	,paint: function(ctx) {
		var _g_head = this.items.h;
		var _g_val = null;
		while(_g_head != null) {
			var item;
			item = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			item.paint(ctx);
		}
	}
	,output: function() {
		var _g_head = this.items.h;
		var _g_val = null;
		while(_g_head != null) {
			var item;
			item = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			item.output();
		}
	}
	,getTime: function() {
		return this.time;
	}
	,__class__: gv_GvSnap
};
var gv_GvSnapItem = function() { };
gv_GvSnapItem.__name__ = true;
gv_GvSnapItem.prototype = {
	__class__: gv_GvSnapItem
};
var gv_GvSnapItem_$Circle = function(x_,y_,r_) {
	this.x = x_;
	this.y = y_;
	this.r = r_;
	this.colorR = 0;
	this.colorG = 0;
	this.colorB = 0;
	this.colorA = 1.0;
};
gv_GvSnapItem_$Circle.__name__ = true;
gv_GvSnapItem_$Circle.__interfaces__ = [gv_GvSnapItem];
gv_GvSnapItem_$Circle.prototype = {
	rgb: function(r,g,b,a) {
		if(a == null) a = 255;
		this.colorR = r / 255.0;
		this.colorG = g / 255.0;
		this.colorB = b / 255.0;
		this.colorA = a / 255.0;
		return this;
	}
	,color: function(cIdx) {
		var rgb = gv_GvCore.gvGetColorFromIndex(cIdx);
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
		ctx.fillStyle = gv_GvCore.rgb(this.colorR,this.colorG,this.colorB,this.colorA);
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2 * Math.PI,false);
		ctx.fill();
	}
	,output: function() {
	}
	,__class__: gv_GvSnapItem_$Circle
};
var gv_GvSnapItem_$Polygon = function() {
	this.yVec = [];
	this.xVec = [];
	this.colorR = 0;
	this.colorG = 0;
	this.colorB = 0;
	this.colorA = 1.0;
};
gv_GvSnapItem_$Polygon.__name__ = true;
gv_GvSnapItem_$Polygon.__interfaces__ = [gv_GvSnapItem];
gv_GvSnapItem_$Polygon.prototype = {
	rgb: function(r,g,b,a) {
		if(a == null) a = 255;
		this.colorR = r / 255.0;
		this.colorG = g / 255.0;
		this.colorB = b / 255.0;
		this.colorA = a / 255.0;
		return this;
	}
	,color: function(cIdx) {
		var rgb = gv_GvCore.gvGetColorFromIndex(cIdx);
		this.colorR = rgb[0];
		this.colorG = rgb[1];
		this.colorB = rgb[2];
		return this;
	}
	,add: function(x,y) {
		this.xVec.push(x);
		this.yVec.push(y);
		return this;
	}
	,getMinX: function() {
		var v = Infinity;
		var _g = 0;
		var _g1 = this.xVec;
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			v = Math.min(v,x);
		}
		return v;
	}
	,getMinY: function() {
		var v = Infinity;
		var _g = 0;
		var _g1 = this.yVec;
		while(_g < _g1.length) {
			var y = _g1[_g];
			++_g;
			v = Math.min(v,y);
		}
		return v;
	}
	,getMaxX: function() {
		var v = -Infinity;
		var _g = 0;
		var _g1 = this.xVec;
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			v = Math.max(v,x);
		}
		return v;
	}
	,getMaxY: function() {
		var v = -Infinity;
		var _g = 0;
		var _g1 = this.yVec;
		while(_g < _g1.length) {
			var y = _g1[_g];
			++_g;
			v = Math.max(v,y);
		}
		return v;
	}
	,paint: function(ctx) {
		var n = this.xVec.length;
		if(0 < n) {
			ctx.fillStyle = gv_GvCore.rgb(this.colorR,this.colorG,this.colorB,this.colorA);
			ctx.beginPath();
			ctx.moveTo(this.xVec[n - 1],this.yVec[n - 1]);
			var _g = 0;
			while(_g < n) {
				var i = _g++;
				ctx.lineTo(this.xVec[i],this.yVec[i]);
			}
			ctx.fill();
		}
	}
	,output: function() {
	}
	,__class__: gv_GvSnapItem_$Polygon
};
var gv_GvSnapItem_$Text = function(text_,x_,y_,r_) {
	this.x = x_;
	this.y = y_;
	this.r = r_;
	this.text = text_;
	this.colorR = 0;
	this.colorG = 0;
	this.colorB = 0;
	this.colorA = 1.0;
};
gv_GvSnapItem_$Text.__name__ = true;
gv_GvSnapItem_$Text.__interfaces__ = [gv_GvSnapItem];
gv_GvSnapItem_$Text.prototype = {
	rgb: function(r,g,b,a) {
		if(a == null) a = 255;
		this.colorR = r / 255.0;
		this.colorG = g / 255.0;
		this.colorB = b / 255.0;
		this.colorA = a / 255.0;
		return this;
	}
	,color: function(cIdx) {
		var rgb = gv_GvCore.gvGetColorFromIndex(cIdx);
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
		var rate = 0.02 * this.r;
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.font = "100px hoge";
		ctx.scale(rate,rate);
		ctx.fillStyle = gv_GvCore.rgb(this.colorR,this.colorG,this.colorB,this.colorA);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.text,0,0);
		ctx.restore();
	}
	,output: function() {
	}
	,__class__: gv_GvSnapItem_$Text
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
gv_GvCore.nowTime = 0;
gv_GvCore.maxTime = 0;
gv_GvCore.minX = 0;
gv_GvCore.minY = 0;
gv_GvCore.maxX = 1;
gv_GvCore.maxY = 1;
gv_GvCore.emptyFlag = true;
gv_GvCore.snapMap = new haxe_ds_IntMap();
gv_GvCore.outMap = new haxe_ds_IntMap();
gv_GvCore.autoModeCount = 0;
gv_GvCore.colors = [[1,0,0],[0,1,0],[0,0,1],[1,1,0],[0,1,1],[1,0,1],[1,0.5,0],[1,0,0.5]];
gv_GvCore.nowDragFlag = false;
gv_GvMain.now = 0;
gv_GvMain.scale = 1.0;
gv_GvMain.cx = 0.0;
gv_GvMain.cy = 0.0;
gv_GvMain.mx = 0.0;
gv_GvMain.my = 0.0;
gv_GvMain.cursorX = 0.0;
gv_GvMain.cursorY = 0.0;
gv_GvMain.myMouseX = 0;
gv_GvMain.myMouseY = 0;
gv_GvMain.autoMode = false;
gv_GvMain.autoModeCount = 0;
js_Boot.__toStr = {}.toString;
gv_GvMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
