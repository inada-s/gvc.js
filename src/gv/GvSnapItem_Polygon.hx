package gv;

import js.html.CanvasRenderingContext2D;

class GvSnapItem_Polygon implements GvSnapItem {
    private var xVec:Array<Float> = new Array<Float>();
    private var yVec:Array<Float> = new Array<Float>();
    private var colorR:Float;
    private var colorG:Float;
    private var colorB:Float;
    public function new() {
        colorR = 0;
        colorG = 0;
        colorB = 0;
    }
    public function rgb(r:Int, g:Int, b:Int):GvSnapItem_Polygon {
        colorR = r / 255.0;
        colorG = g / 255.0;
        colorB = b / 255.0;
        return this;
    }
    public function color(cIdx:Int):GvSnapItem_Polygon {
        var rgb:Array<Float> = GvCore.gvGetColorFromIndex(cIdx);
        colorR = rgb[0];
        colorG = rgb[1];
        colorB = rgb[2];
        return this;
    }
    public function add(x:Float, y:Float):GvSnapItem_Polygon {
        xVec.push(x);
        yVec.push(y);
        return this;
    }
    public function getMinX():Float {
        var v = Math.POSITIVE_INFINITY;
        for(x in xVec) {
            v = Math.min(v, x);
        }
        return v;
    }
    public function getMinY():Float {
        var v = Math.POSITIVE_INFINITY;
        for(y in yVec) {
            v = Math.min(v, y);
        }
        return v;
    }
    public function getMaxX():Float {
        var v = Math.NEGATIVE_INFINITY;
        for(x in xVec) {
            v = Math.max(v, x);
        }
        return v;
    }
    public function getMaxY():Float {
        var v = Math.NEGATIVE_INFINITY;
        for(y in yVec) {
            v = Math.max(v, y);
        }
        return v;
    }
    public function paint(ctx:CanvasRenderingContext2D):Void {
        var n = xVec.length;
        if(0<n) {
            ctx.fillStyle = GvCore.rgb(colorR, colorG, colorB);
            ctx.beginPath();
            ctx.moveTo(xVec[n-1], yVec[n-1]);
            for(i in 0...n) {
                ctx.lineTo(xVec[i], yVec[i]);
            }
            ctx.fill();
        }
    }
    public function output():Void {
    }
}