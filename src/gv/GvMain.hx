package gv;

import js.html.Element;
import js.html.TouchEvent;
import js.html.MouseEvent;
import js.html.KeyboardEvent;
import js.html.Event;
import js.html.CanvasRenderingContext2D;
import js.html.CanvasElement;
import js.Browser;
import Main;

class GvMain {
    static var canvas:CanvasElement;
    static var div:Element;
    static var ctx:CanvasRenderingContext2D;
    static var timeList:Array<Int> = null;
    static var now:Int = 0;
    static var nowSnap:GvSnap = null;
    static var scale:Float = 1.0;
    static var cx:Float = 0.0;
    static var cy:Float = 0.0;
    static var mx:Float = 0.0;
    static var my:Float = 0.0;
    static var cursorX:Float = 0.0;
    static var cursorY:Float = 0.0;
    static var myMouseX:Float = 0;
    static var myMouseY:Float = 0;
    static var autoMode:Bool = false;
    static var autoModeCount:Int = 0;
    public static function main() {
        Browser.window.onload = function(e:Event):Void {
            canvas = cast(Browser.document.createElement("canvas"));
            Browser.document.body.appendChild(canvas);
            canvas.style.position = "absolute";
            canvas.style.left = "0px";
            canvas.style.top = "0px";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = Browser.window.innerWidth;
            canvas.height = Browser.window.innerHeight;
            ctx = canvas.getContext2d();
            div = Browser.document.createElement("div");
            Browser.document.body.appendChild(div);
            div.style.position = "absolute";
            div.style.left = "0px";
            div.style.bottom = "0px";
            Browser.window.onresize = function(e:Event):Void {
                canvas.width = Browser.window.innerWidth;
                canvas.height = Browser.window.innerHeight;
                updateUI();
            };
            Browser.window.onkeydown = function(e:KeyboardEvent):Void {
                switch(e.keyCode) {
                    case 37://LEFT
                        autoMode = false;
                        if(1<=now) {
                            --now;
                            updateTime();
                        }
                    case 38://UP
                        updateSelf(null, false, 4, false, false);
                    case 39://RIGHT
                        autoMode = false;
                        if(timeList!=null && now<timeList.length-1) {
                            ++now;
                            updateTime();
                        }
                    case 40://DOWN
                        updateSelf(null, false, -4, false, false);
                    case 97://NUMPAD1
                        onNumpadKey(-0.7, 0.7);
                    case 98://NUMPAD2
                        onNumpadKey(0, 1);
                    case 99://NUMPAD3
                        onNumpadKey(0.7, 0.7);
                    case 100://NUMPAD4
                        onNumpadKey(-1, 0);
                    case 102://NUMPAD6
                        onNumpadKey(1, 0);
                    case 103://NUMPAD7
                        onNumpadKey(-0.7, -0.7);
                    case 104://NUMPAD8
                        onNumpadKey(0, -1);
                    case 105://NUMPAD9
                        onNumpadKey(0.7, -0.7);
                }
            };
            var mouseDownFlag:Bool = false;
            Browser.window.onmousedown = function(e:MouseEvent):Bool {
                mouseDownFlag = true;
                myMouseX = e.x;
                myMouseY = e.y;
                updateSelf(null, false, 0, false, e.shiftKey);
                return false;
            };
            Browser.window.onmouseup = function(e:MouseEvent):Bool {
                mouseDownFlag = false;
                myMouseX = e.x;
                myMouseY = e.y;
                updateSelf(null, false, 0, false, false);
                return false;
            };
            Browser.window.onmousemove = function(e:MouseEvent):Bool {
                myMouseX = e.x;
                myMouseY = e.y;
                updateSelf(null, mouseDownFlag, 0, false, false);
                return false;
            };
            Browser.window.onmousewheel = function(e:MouseEvent):Bool {
                myMouseX = e.x;
                myMouseY = e.y;
                var wheel:Int = (0<e.detail ? -1 : e.detail<0 ? 1 : 0);
                if(wheel==0) {
                    var wheelDelta = untyped(e.wheelDelta);
                    wheel = (0<wheelDelta ? 1 : wheelDelta<0 ? -1 : 0);
                }
                updateSelf(null, false, wheel, false, false);
                return false;
            };
            var beforeTouchX:Null<Float> = null;
            var beforeTouchY:Null<Float> = null;
            var beforeTouchD:Null<Float> = null;
            var baseNow:Int = 0;
            var beforeTouchLength:Int = 0;
            var touchK = 12.425134878021496 / Math.log(2);
            var touchIds = new Map<Int, Bool>();
            var touchFunc = function(e:TouchEvent):Bool {
                if(beforeTouchLength!=e.touches.length) {
                    beforeTouchX = null;
                }
                beforeTouchLength = e.touches.length;
                if(1<=e.touches.length) {
                    for(i in 0...e.touches.length) {
                        var t = e.touches.item(i);
                        if(!touchIds.exists(t.identifier)) {
                            beforeTouchX = null;
                        }
                    }
                    var sumX:Float = 0;
                    var sumY:Float = 0;
                    for(i in 0...e.touches.length) {
                        var t = e.touches.item(i);
                        sumX += t.pageX;
                        sumY += t.pageY;
                    }
                    var x = sumX / e.touches.length;
                    var y = sumY / e.touches.length;
                    var sumD:Float = 0;
                    for(i in 0...e.touches.length) {
                        var t = e.touches.item(i);
                        var dx = t.pageX - x;
                        var dy = t.pageY - y;
                        sumD += Math.sqrt(dx*dx+dy*dy+0.00001);
                    }
                    var d = sumD / e.touches.length;
                    if(beforeTouchX!=null) {
                        if(3<=e.touches.length) {
                            autoMode = false;
                            var fPos = 70.0 * (x-beforeTouchX) / canvas.width;
                            var newNow = baseNow + (0<=fPos ? Math.floor(fPos) : Math.ceil(fPos));
                            if(newNow!=now && timeList!=null && 0<=newNow && newNow<timeList.length) {
                                now = newNow;
                                updateTime();
                            }
                        }
                        else if(2==e.touches.length) {
                            var wheel = Math.log(d / beforeTouchD)*touchK;
                            myMouseX = x;
                            myMouseY = y;
                            updateSelf(null, false, wheel, false, false);
                            beforeTouchX = x;
                            beforeTouchY = y;
                            beforeTouchD = d;
                        }
                        else if(1==e.touches.length) {
                            myMouseX = x;
                            myMouseY = y;
                            updateSelf(null, true, 0, false, false);
                            beforeTouchX = x;
                            beforeTouchY = y;
                            beforeTouchD = d;
                        }
                    }
                    else {
                        myMouseX = x;
                        myMouseY = y;
                        updateSelf(null, false, 0, false, false);
                        beforeTouchX = x;
                        beforeTouchY = y;
                        beforeTouchD = d;
                        baseNow = now;
                    }
                }
                touchIds = new Map<Int, Bool>();
                for(i in 0...e.touches.length) {
                    var t = e.touches.item(i);
                    touchIds.set(t.identifier, true);
                }
                e.preventDefault();
                return false;
            };
            Browser.window.ontouchmove = touchFunc;
            Browser.window.ontouchstart = function(e:TouchEvent):Bool {
                beforeTouchX = null;
                touchFunc(e);
                return false;
            };
            Browser.window.ontouchcancel = function(e:TouchEvent):Bool {
                beforeTouchX = null;
                e.preventDefault();
                return false;
            }
            Browser.window.ontouchend = function(e:TouchEvent):Bool {
                beforeTouchX = null;
                e.preventDefault();
                return false;
            }
            Main.main();
            updateTimeList();
        };
    }
    public static function onNumpadKey(dx:Float, dy:Float) {
        var newCx = Math.min(Math.max(-mx, cx+dx*scale*0.25), mx);
        var newCy = Math.min(Math.max(-my, cy+dy*scale*0.25), my);
        if(cx!=newCx || cy!=newCy) {
            cx = newCx;
            cy = newCy;
            updateUI();
        }
    }
    public static function updateUI():Void {
        if(paintTimer!=null) {
            Browser.window.clearTimeout(paintTimer);
        }
        paintTimer = Browser.window.setTimeout(paintSelf, 10);
    }
    static var paintTimer:Null<Int> = null;
    public static function paintSelf():Void {
        paintTimer = null;
        updateSelf(ctx, false, 0, false, false);
    }
    public static function updateSelf(ctx:CanvasRenderingContext2D, mouseDown:Bool, zoom:Float, zoom2:Bool, shiftClick:Bool):Void {
        var width = Math.max(1, canvas.width);
        var height = Math.max(1, canvas.height);
        var dx = GvCore.getMaxX() - GvCore.getMinX();
        var dy = GvCore.getMaxY() - GvCore.getMinY();
        var maxD = Math.max(dx, dy);
        var scale, sx, sy;
        if(dx*height < dy*width) {
            my = (1-GvMain.scale)*0.5;
            scale = height/(dy*GvMain.scale);
            if(scale*dx<=width) {
                mx = 0;
            }
            else {
                mx = (dx-width/scale)/maxD * 0.5;
            }
        }
        else {
            mx = (1-GvMain.scale)*0.5;
            scale = width/(dx*GvMain.scale);
            if(scale*dy<=height) {
                my = 0;
            }
            else {
                my = (dy-height/scale)/maxD * 0.5;
            }
        }
        updateCenter();
        var beforeCursorX = cursorX;
        var beforeCursorY = cursorY;
        if(zoom2) {
            cx = (cursorX-(myMouseX-width*0.5)/scale-dx*0.5-GvCore.getMinX()) / maxD;
            cy = (cursorY-(myMouseY-height*0.5)/scale-dy*0.5-GvCore.getMinY()) / maxD;
            updateCenter();
            return;
        }
        cursorX = (myMouseX-width*0.5)/scale+dx*0.5+GvCore.getMinX()+maxD*cx;
        cursorY = (myMouseY-height*0.5)/scale+dy*0.5+GvCore.getMinY()+maxD*cy;
        if(mouseDown) {
            var dcx = cursorX - beforeCursorX;
            var dcy = cursorY - beforeCursorY;
            var oldCx = cx;
            var oldCy = cy;
            cx -= dcx/maxD;
            cy -= dcy/maxD;
            updateCenter();
            if(oldCx!=cx || oldCy!=cy) {
                if(zoom!=0) {
                    cursorX = (myMouseX-width*0.5)/scale+dx*0.5+GvCore.getMinX()+maxD*cx;
                    cursorY = (myMouseY-height*0.5)/scale+dy*0.5+GvCore.getMinY()+maxD*cy;
                    var newScale = Math.min(Math.max(0.01, GvMain.scale * Math.pow(0.5, zoom*0.080482023721841)), 1.0);
                    if(GvMain.scale!=newScale) {
                        GvMain.scale = newScale;
                        updateSelf(null, false, 0, true, false);
                    }
                }
                updateUI();
                return;
            }
        }
        if(zoom!=0) {
            var newScale = Math.min(Math.max(0.01, GvMain.scale * Math.pow(0.5, zoom*0.080482023721841)), 1.0);
            if(GvMain.scale!=newScale) {
                GvMain.scale = newScale;
                updateSelf(null, false, 0, true, false);
                updateUI();
                return;
            }
        }
        if(nowSnap==null) {
            return;
        }
        var time = nowSnap.getTime();
        if(shiftClick) {
            GvCore.sendInput(time, cursorX, cursorY);
        }
        var title:String;
        if(0<=myMouseX && 0<=myMouseY && GvCore.getMinX()<=cursorX && cursorX<=GvCore.getMaxX() && GvCore.getMinY()<=cursorY && cursorY<=GvCore.getMaxY()) {
            div.textContent = 'time ${time} ( ${now+1} / ${timeList.length} ) (${Std.int(cursorX+0.5)}, ${Std.int(cursorY+0.5)}) (${cursorX}, ${cursorY})';
        }
        else {
            div.textContent = 'time ${time} ( ${now+1} / ${timeList.length} )';
        }
        sx = (width/scale-dx)*0.5-GvCore.getMinX()-maxD*cx;
        sy = (height/scale-dy)*0.5-GvCore.getMinY()-maxD*cy;
        if(ctx!=null) {
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.scale(scale, scale);
            ctx.translate(sx, sy);
            nowSnap.paint(ctx);
            ctx.restore();
        }
    }
    private static function updateCenter():Void {
        cx = Math.min(Math.max(-mx, cx), mx);
        cy = Math.min(Math.max(-my, cy), my);
    }
    private static function updateTime():Void {
        if(timeList!=null && now<timeList.length) {            var time:Int = timeList[now];
            if(now==timeList.length-1) {
                autoMode = true;
            }
            nowSnap = GvCore.getSnap(time);
            nowSnap.output();
            updateUI();
            var amc:Int = GvCore.getAutoModeCount();
            if(amc!=autoModeCount) {
                autoModeCount = amc;
                autoMode = true;
            }
            if(autoMode) {
                //TODO: autoModeTimer.restart();
            }
            return;
        }
        nowSnap = null;
    }
    private static function updateTimeList():Void {
        var nowTime = (timeList!=null && now<timeList.length) ? timeList[now] : 0.0;
        timeList = GvCore.getTimeList();
        if(timeList!=null && 0<timeList.length) {
            var minDiff = Math.abs(nowTime - timeList[0]);
            now = 0;
            for(i in 1...timeList.length) {
                var diff = Math.abs(nowTime - timeList[i]);
                if(diff<minDiff) {
                    minDiff = diff;
                    now = i;
                }
            }
            updateTime();
        }
    }
}
