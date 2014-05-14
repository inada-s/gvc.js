package gv;

import js.html.CanvasRenderingContext2D;

interface GvSnapItem {
    function getMinX():Float;
    function getMinY():Float;
    function getMaxX():Float;
    function getMaxY():Float;
    function paint(ctx:CanvasRenderingContext2D):Void;
    function output():Void;
}