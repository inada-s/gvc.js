package gv;

import haxe.macro.Expr;
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
    public static function text(text:String, x:Float, y:Float, r:Float = 0.5):GvSnapItem_Text {
        var ret = new GvSnapItem_Text(text, x, y, r);
        if(enable_) {
            GvCore.addItem(ret);
        }
        return ret;
    }
    public static function arrow(fromX:Float, fromY:Float, toX:Float, toY:Float, r:Float = 0.5):GvSnapItem_Polygon {
        var ret = new GvSnapItem_Polygon();
        var odx = toX-fromX;
        var ody = toY-fromY;
        var rate = r / Math.sqrt(odx*odx+ody*ody);
        var dx = odx * rate;
        var dy = ody * rate;
        var x2_base = toX+dx*0.1;
        var y2_base = toY+dy*0.1;
        var dx0 = dx*0.1*Math.tan(Math.PI*15/180);
        var dy0 = dy*0.1*Math.tan(Math.PI*15/180);
        var x2_3 = x2_base-dx*(0.1/Math.sin(Math.PI*15/180));
        var y2_3 = y2_base-dy*(0.1/Math.sin(Math.PI*15/180));
        var x2_4 = x2_3-dx*(0.05/Math.tan(Math.PI*15/180));
        var y2_4 = y2_3-dy*(0.05/Math.tan(Math.PI*15/180));
        var x2_5 = x2_base-dx*(1.0*Math.cos(Math.PI*15/180));
        var y2_5 = y2_base-dy*(1.0*Math.cos(Math.PI*15/180));
        var x2_6 = x2_5-dx*(0.1*Math.sin(Math.PI*15/180));
        var y2_6 = y2_5-dy*(0.1*Math.sin(Math.PI*15/180));
        var dx5 = dx*(1.0*Math.sin(Math.PI*15/180));
        var dy5 = dy*(1.0*Math.sin(Math.PI*15/180));
        var dx6 = dx5-dx*(0.1*Math.cos(Math.PI*15/180));
        var dy6 = dy5-dy*(0.1*Math.cos(Math.PI*15/180));
        ret.add(toX-dy0, toY+dx0);
        ret.add(x2_5-dy5, y2_5+dx5);
        ret.add(x2_6-dy6, y2_6+dx6);
        ret.add(x2_4-dy*0.05, y2_4+dx*0.05);
        ret.add(fromX+dx*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))-dy*0.05, fromY+dy*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))+dx*0.05);
        ret.add(fromX-dy*(0.05/(1+Math.sqrt(2))), fromY+dx*(0.05/(1+Math.sqrt(2))));
        ret.add(fromX+dy*(0.05/(1+Math.sqrt(2))), fromY-dx*(0.05/(1+Math.sqrt(2))));
        ret.add(fromX+dx*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))+dy*0.05, fromY+dy*(0.05*Math.sqrt(2)/(1+Math.sqrt(2)))-dx*0.05);
        ret.add(x2_4+dy*0.05, y2_4-dx*0.05);
        ret.add(x2_6+dy6, y2_6-dx6);
        ret.add(x2_5+dy5, y2_5-dx5);
        ret.add(toX+dy0, toY-dx0);
        if(enable_) {
            GvCore.addItem(ret);
        }
        return ret;
    }
    public static function arrowBoth(x1:Float, y1:Float, x2:Float, y2:Float, r:Float = 0.5):GvSnapItem_Polygon {
        var ret = new GvSnapItem_Polygon();
        var odx = x2-x1;
        var ody = y2-y1;
        var rate = r / Math.sqrt(odx*odx+ody*ody);
        var dx = odx * rate;
        var dy = ody * rate;
        var x1_base = x1-dx*0.1;
        var y1_base = y1-dy*0.1;
        var x2_base = x2+dx*0.1;
        var y2_base = y2+dy*0.1;
        var dx0 = dx*0.1*Math.tan(Math.PI*15/180);
        var dy0 = dy*0.1*Math.tan(Math.PI*15/180);
        var x2_3 = x2_base-dx*(0.1/Math.sin(Math.PI*15/180));
        var y2_3 = y2_base-dy*(0.1/Math.sin(Math.PI*15/180));
        var x2_4 = x2_3-dx*(0.05/Math.tan(Math.PI*15/180));
        var y2_4 = y2_3-dy*(0.05/Math.tan(Math.PI*15/180));
        var x2_5 = x2_base-dx*(1.0*Math.cos(Math.PI*15/180));
        var y2_5 = y2_base-dy*(1.0*Math.cos(Math.PI*15/180));
        var x2_6 = x2_5-dx*(0.1*Math.sin(Math.PI*15/180));
        var y2_6 = y2_5-dy*(0.1*Math.sin(Math.PI*15/180));
        var x1_3 = x1_base+dx*(0.1/Math.sin(Math.PI*15/180));
        var y1_3 = y1_base+dy*(0.1/Math.sin(Math.PI*15/180));
        var x1_4 = x1_3+dx*(0.05/Math.tan(Math.PI*15/180));
        var y1_4 = y1_3+dy*(0.05/Math.tan(Math.PI*15/180));
        var x1_5 = x1_base+dx*(1.0*Math.cos(Math.PI*15/180));
        var y1_5 = y1_base+dy*(1.0*Math.cos(Math.PI*15/180));
        var x1_6 = x1_5+dx*(0.1*Math.sin(Math.PI*15/180));
        var y1_6 = y1_5+dy*(0.1*Math.sin(Math.PI*15/180));
        var dx5 = dx*(1.0*Math.sin(Math.PI*15/180));
        var dy5 = dy*(1.0*Math.sin(Math.PI*15/180));
        var dx6 = dx5-dx*(0.1*Math.cos(Math.PI*15/180));
        var dy6 = dy5-dy*(0.1*Math.cos(Math.PI*15/180));
        ret.add(x2-dy0, y2+dx0);
        ret.add(x2_5-dy5, y2_5+dx5);
        ret.add(x2_6-dy6, y2_6+dx6);
        ret.add(x2_4-dy*0.05, y2_4+dx*0.05);
        ret.add(x1_4-dy*0.05, y1_4+dx*0.05);
        ret.add(x1_6-dy6, y1_6+dx6);
        ret.add(x1_5-dy5, y1_5+dx5);
        ret.add(x1-dy0, y1+dx0);
        ret.add(x1+dy0, y1-dx0);
        ret.add(x1_5+dy5, y1_5-dx5);
        ret.add(x1_6+dy6, y1_6-dx6);
        ret.add(x1_4+dy*0.05, y1_4-dx*0.05);
        ret.add(x2_4+dy*0.05, y2_4-dx*0.05);
        ret.add(x2_6+dy6, y2_6-dx6);
        ret.add(x2_5+dy5, y2_5-dx5);
        ret.add(x2+dy0, y2-dx0);
        if(enable_) {
            GvCore.addItem(ret);
        }
        return ret;
    }
    public static function inputInt(callback:Int->Int->Int->Void):Void {
        GvCore.inputInt(callback);
    }
    public static function inputFloat(callback:Int->Float->Float->Void):Void {
        GvCore.inputFloat(callback);
    }
}
