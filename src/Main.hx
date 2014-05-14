package;

import gv.Gv;
class Main {
    public static function main() {
        Gv.circle(1.0, 1.0);
        Gv.circle(2.0, 1.0).color(0);
        Gv.circle(3.0, 1.0).color(1);
        Gv.circle(4.0, 1.0).color(2);
        Gv.circle(1.0, 2.0).rgb(255, 0, 0);
    }
}