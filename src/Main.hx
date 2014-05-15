package;

import gv.Gv;
class Main {
    public static function callback(time:Int, x:Int, y:Int):Void {
        Gv.newTime(time);
        Gv.circle(x, y, 0.1);
        Gv.inputInt(callback);
    }
    public static function main() {
        Gv.circle(1.0, 1.0);
        Gv.text("A", 2.0, 1.0).color(0);
        Gv.text("B", 3.0, 1.0).color(1);
        Gv.text("C", 4.0, 1.0).color(2);
        Gv.circle(1.0, 2.0).rgb(255, 0, 0);
        Gv.arrow(1, 1, 2, 1);
        Gv.newTime();
        Gv.circle(2.0, 1.0).color(0);
        Gv.circle(3.0, 1.0).color(1);
        Gv.circle(4.0, 1.0).color(2);
        Gv.text("A", 1.0, 2.0).rgb(255, 0, 0);
        Gv.arrow(2, 1, 3, 1);
        Gv.newTime();
        Gv.text("B", 3.0, 1.0).color(1);
        Gv.text("C", 4.0, 1.0).color(2);
        Gv.circle(1.0, 2.0).rgb(255, 0, 0);
        Gv.arrow(3, 1, 4, 1);
        Gv.newTime();
        Gv.circle(4.0, 1.0).color(2);
        Gv.text("A", 1.0, 2.0).rgb(255, 0, 0);
        Gv.arrow(4, 1, 1, 2);
        Gv.newTime();
        Gv.circle(1.0, 2.0).rgb(255, 0, 0);
        Gv.inputInt(callback);
    }
}