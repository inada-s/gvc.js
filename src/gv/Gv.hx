package gv;

class Gv {
    @:expose("n")
    public static function newTime(time:Null<Int> = null):Void {
        GvCore.newTime(time);
    }
    @:expose("c")
    public static function circle(x:Float, y:Float, r:Float = 0.5):GvSnapItem_Circle {
        var ret = new GvSnapItem_Circle(x, y, r);
        GvCore.addItem(ret);
        return ret;
    }
    @:expose("t")
    public static function text(text:String, x:Float, y:Float, r:Float = 0.5):GvSnapItem_Text {
        var ret = new GvSnapItem_Text(text, x, y, r);
        GvCore.addItem(ret);
        return ret;
    }
    @:expose("p")
    public static function polygon() {
        var arg:Array<Float> = untyped __js__("arguments");
        var ret = new GvSnapItem_Polygon();
        for(i in 0...cast(arg.length/2, Int)) {
            ret.add(arg[i]*2, arg[i]*2+1);
        }
        GvCore.addItem(ret);
        return ret;
    }
    @:expose("a")
    public static function autoMode():Void {
        GvCore.autoMode();
    }
}
