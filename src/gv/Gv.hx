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
    public static function polygon():GvSnapItem_Polygon {
        var arg:Array<Float> = untyped __js__("arguments");
        var ret = new GvSnapItem_Polygon();
        for(i in 0...cast(arg.length/2, Int)) {
            ret.add(arg[i*2], arg[i*2+1]);
        }
        GvCore.addItem(ret);
        return ret;
    }
    @:expose("l")
    public static function line(fromX:Float, fromY:Float, toX:Float, toY:Float, r:Float = 0.5):GvSnapItem_Polygon {
        var ret = new GvSnapItem_Polygon();
        var odx = toX-fromX;
        var ody = toY-fromY;
        var rate = r / Math.sqrt(odx*odx+ody*ody);
        var dx = odx * rate;
        var dy = ody * rate;
        ret.add(toX+dy*(0.05/(1+Math.sqrt(2))), toY+dx*(0.05/(1+Math.sqrt(2))));
        ret.add(toX-dx*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))-dy*0.05, toY-dy*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))+dx*0.05);
        ret.add(fromX+dx*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))-dy*0.05, fromY+dy*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))+dx*0.05);
        ret.add(fromX-dy*(0.05/(1+Math.sqrt(2))), fromY+dx*(0.05/(1+Math.sqrt(2))));
        ret.add(fromX+dy*(0.05/(1+Math.sqrt(2))), fromY-dx*(0.05/(1+Math.sqrt(2))));
        ret.add(fromX+dx*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))+dy*0.05, fromY+dy*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))-dx*0.05);
        ret.add(toX-dx*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))+dy*0.05, toY-dy*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))-dx*0.05);
        ret.add(toX+dy*(0.05/(1+Math.sqrt(2))), toY-dx*(0.05/(1+Math.sqrt(2))));
        GvCore.addItem(ret);
        return ret;
    }
    @:expose("o")
    public static function out(line:String):Void {
        GvCore.addOut(line);
    }
    @:expose("a")
    public static function autoMode():Void {
        GvCore.autoMode();
    }
}
