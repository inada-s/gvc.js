package gv;

import js.html.Event;
import js.html.CanvasRenderingContext2D;
import js.html.CanvasElement;
import js.Browser;

class GvMain {
    static function main() {
        Browser.window.onload = function(e:Event):Void {
            var canvas:CanvasElement = cast(Browser.document.createElement("canvas"));
            Browser.document.body.appendChild(canvas);
            canvas.style.position = "absolute";
            canvas.style.left = "0px";
            canvas.style.top = "0px";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = Browser.window.innerWidth;
            canvas.height = Browser.window.innerHeight;
            var ctx:CanvasRenderingContext2D = canvas.getContext2d();
            Browser.window.onresize = function(e:Event):Void {
                canvas.width = Browser.window.innerWidth;
                canvas.height = Browser.window.innerHeight;
                ctx.beginPath();
                ctx.fillRect(20, 20, 80, 40);
            };
            ctx.beginPath();
            ctx.fillRect(20, 20, 80, 40);
        };
    }
}
