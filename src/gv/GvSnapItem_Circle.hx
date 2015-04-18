package gv;

import js.html.CanvasRenderingContext2D;

class GvSnapItem_Circle implements GvSnapItem {
    private var x:Float;
    private var y:Float;
    private var r:Float;
    private var colorR:Float;
    private var colorG:Float;
    private var colorB:Float;
    public function new(x_:Float, y_:Float, r_:Float) {
        x = x_;
        y = y_;
        r = r_;
        colorR = 0;
        colorG = 0;
        colorB = 0;
    }
    public function rgb(r:Int, g:Int, b:Int):GvSnapItem_Circle {
        colorR = r / 255.0;
        colorG = g / 255.0;
        colorB = b / 255.0;
        return this;
    }
    public function color(cIdx:Int):GvSnapItem_Circle {
        var rgb:Array<Float> = GvCore.gvGetColorFromIndex(cIdx);
        colorR = rgb[0];
        colorG = rgb[1];
        colorB = rgb[2];
        return this;
    }
    public function getMinX():Float {
        return x - r;
    }
    public function getMinY():Float {
        return y - r;
    }
    public function getMaxX():Float {
        return x + r;
    }
    public function getMaxY():Float {
        return y + r;
    }
    public function paint(ctx:CanvasRenderingContext2D):Void {
        ctx.fillStyle = GvCore.rgb(colorR, colorG, colorB);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI, false);
        ctx.fill();
    }
    public function output():Void {
    }
}