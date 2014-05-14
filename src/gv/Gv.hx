package gv;

class Gv {
    private static var enable_:Bool = true;
    public static function setEnable(enable:Bool) {
        enable_ = enable;
    }
    public static function newTime(time:Null<Int> = null):Void {
        if(!enable_) {
            return;
        }
        GvCore.newTime(time);
    }
    public static function rollbackAll():Void {
        if(!enable_) {
            return;
        }
        GvCore.rollbackAll();
    }
    public static function circle(x:Float, y:Float, r:Float = 0.5):GvSnapItem_Circle {
        var ret = new GvSnapItem_Circle(x, y, r);
        if(enable_) {
            GvCore.addItem(ret);
        }
        return ret;
    }
}
