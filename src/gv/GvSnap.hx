package gv;

import js.html.CanvasRenderingContext2D;

class GvSnap {
    private var time:Int;
    private var items:List<GvSnapItem>;
    public function new(time:Int) {
        this.time = time;
        items = new List<GvSnapItem>();
    }
    public function addItem(item:GvSnapItem):Void {
        items.add(item);
    }
    public function paint(ctx:CanvasRenderingContext2D):Void {
        for(item in items) {
            item.paint(ctx);
        }
    }
    public function output():Void {
        for(item in items) {
            item.output();
        }
    }
    public function getTime():Int {
        return time;
    }
}