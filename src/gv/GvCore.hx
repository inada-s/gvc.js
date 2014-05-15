package gv;

class GvCore {
    private static var nowTime:Int = 0;
    private static var maxTime:Int = 0;
    private static var minX:Float = 0;
    private static var minY:Float = 0;
    private static var maxX:Float = 1;
    private static var maxY:Float = 1;
    private static var emptyFlag:Bool = true;
    private static var snapMap:Map<Int, GvSnap> = new Map<Int, GvSnap>();
    private static var autoModeCount:Int = 0;
    public static function newTime(time:Null<Int> = null):Void {
        if(time==null) {
            nowTime = Std.int(0.1+Math.max(0, maxTime + 1));
        }
        else {
            maxTime = Std.int(0.1+Math.max(maxTime, time));
            nowTime = time;
        }
    }
    public static function rollbackAll():Void {
        nowTime = 0;
        maxTime = 0;
        minX = 0;
        minY = 0;
        maxX = 0;
        maxY = 0;
        emptyFlag = true;
        snapMap = new Map<Int, GvSnap>();
    }
    public static function addItem(item:GvSnapItem):Void {
        if(emptyFlag) {
            emptyFlag = false;
            minX = item.getMinX();
            minY = item.getMinY();
            maxX = item.getMaxX();
            maxY = item.getMaxY();
            maxTime = nowTime;
        }
        else {
            minX = Math.min(minX, item.getMinX());
            minY = Math.min(minY, item.getMinY());
            maxX = Math.max(maxX, item.getMaxX());
            maxY = Math.max(maxY, item.getMaxY());
            maxTime = Std.int(0.1+Math.max(maxTime, nowTime));
        }
        if(snapMap.exists(nowTime)) {
            var snap:GvSnap = snapMap.get(nowTime);
            snap.addItem(item);
        }
        else {
            var snap:GvSnap = new GvSnap(nowTime);
            snapMap.set(nowTime, snap);
            snap.addItem(item);
        }
    }
    public static function getMinX():Float {
        return minX;
    }
    public static function getMinY():Float {
        return minY;
    }
    public static function getMaxX():Float {
        return maxX;
    }
    public static function getMaxY():Float {
        return maxY;
    }
    public static function getTimeList():Array<Int> {
        var ret = new Array<Int>();
        for(k in snapMap.keys()) {
            ret.push(k);
        }
        return ret;
    }
    public static function getSnap(time:Int):GvSnap {
        return snapMap.get(time);
    }
    public static function getAutoModeCount():Int {
        return autoModeCount;
    }
    public static function sendInput(time:Int, x:Float, y:Float):Void {
        if(inputInt_!=null) {
            var func:Int->Int->Int->Void = inputInt_;
            inputInt_ = null;
            func(time, Math.round(x), Math.round(y));
        }
        else if(inputFloat_!=null) {
            var func:Int->Float->Float->Void = inputFloat_;
            inputFloat_ = null;
            func(time, x, y);
        }
    }
    private static var colors:Array<Array<Float> > = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [0, 1, 1], [1, 0, 1], [1, 0.5, 0], [1, 0, 0.5]];
    public static function gvGetColorFromIndex(idx:Int):Array<Float> {
        return colors[idx];
    }
    private static var inputInt_:Int->Int->Int->Void = null;
    private static var inputFloat_:Int->Float->Float->Void = null;
    public static function inputInt(callback:Int->Int->Int->Void):Void {
        inputInt_ = callback;
        inputFloat_ = null;
    }
    public static function inputFloat(callback:Int->Float->Float->Void):Void {
        inputFloat_ = callback;
        inputInt_ = null;
    }
    public static function autoMode():Void {
        ++autoModeCount;
    }
}
