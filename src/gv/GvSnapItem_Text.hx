package gv;

import js.html.CanvasRenderingContext2D;

class GvSnapItem_Text implements GvSnapItem {
    private var x:Float;
    private var y:Float;
    private var r:Float;
    private var text:String;
    private var colorR:Float;
    private var colorG:Float;
    private var colorB:Float;
    public function new(text_:String, x_:Float, y_:Float, r_:Float) {
        x = x_;
        y = y_;
        r = r_;
        text = text_;
        colorR = 0;
        colorG = 0;
        colorB = 0;
    }
    public function rgb(r:Int, g:Int, b:Int):GvSnapItem_Text {
        colorR = r / 255.0;
        colorG = g / 255.0;
        colorB = b / 255.0;
        return this;
    }
    public function color(cIdx:Int):GvSnapItem_Text {
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
        var rate = 0.02*r;
        ctx.save();
        ctx.translate(x, y);
        ctx.font = "100px hoge";
        ctx.scale(rate, rate);
        ctx.setFillColor(colorR, colorG, colorB, 1.0);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }
    public function output():Void {
    }
}