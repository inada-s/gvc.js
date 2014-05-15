package math;

import haxe.Int64;

abstract Int64(haxe.Int64) to haxe.Int64 {
    public function new(v:haxe.Int64) {
        this = v;
    }

    public function toString() {
        return haxe.Int64.toStr(this);
    }

    @:from public static function fromInt64(v:haxe.Int64) {
        return new Int64(v);
    }

    @:from public static function fromInt(v:Int) {
        return haxe.Int64.ofInt(v);
    }

    @:op(++A) public inline function leftInc():Int64 {
        this = haxe.Int64.add(this, haxe.Int64.ofInt(1));
        return this;
    }

    @:op(A++) public inline function rightInc():Int64 {
        var ret = this;
        this = haxe.Int64.add(this, haxe.Int64.ofInt(1));
        return ret;
    }

    @:op(--A) public inline function leftDec():Int64 {
        this = haxe.Int64.sub(this, haxe.Int64.ofInt(1));
        return this;
    }

    @:op(A--) public inline function rightDec():Int64 {
        var ret = this;
        this = haxe.Int64.sub(this, haxe.Int64.ofInt(1));
        return ret;
    }

    @:op(-A) public static function neg(v:Int64):Int64 {
        return haxe.Int64.neg(v);
    }

    @:op(~A) public static function bitNot(v:Int64):Int64 {
        return haxe.Int64.xor(v, haxe.Int64.make(-1, -1));
    }

    @:op(A + B) public static function add(left:Int64, right:Int64):Int64 {
        return haxe.Int64.add(left, right);
    }

    @:op(A + B) public static function add_i_i64(left:Int, right:Int64):Int64 {
        return add(left, right);
    }

    @:op(A + B) public static function add_i64_i(left:Int64, right:Int):Int64 {
        return add(left, right);
    }

    @:op(A - B) public static function sub(left:Int64, right:Int64):Int64 {
        return haxe.Int64.sub(left, right);
    }

    @:op(A - B) public static function sub_i_i64(left:Int, right:Int64):Int64 {
        return sub(left, right);
    }

    @:op(A - B) public static function sub_i64_i(left:Int64, right:Int):Int64 {
        return sub(left, right);
    }

    @:op(A * B) public static function mul(left:Int64, right:Int64):Int64 {
        return haxe.Int64.mul(left, right);
    }

    @:op(A * B) public static function mul_i_i64(left:Int, right:Int64):Int64 {
        return mul(left, right);
    }

    @:op(A * B) public static function mul_i64_i(left:Int64, right:Int):Int64 {
        return mul(left, right);
    }

    @:op(A / B) public static function div(left:Int64, right:Int64):Int64 {
        return haxe.Int64.div(left, right);
    }

    @:op(A / B) public static function div_i_i64(left:Int, right:Int64):Int64 {
        return div(left, right);
    }

    @:op(A / B) public static function div_i64_i(left:Int64, right:Int):Int64 {
        return div(left, right);
    }

    @:op(A % B) public static function mod(left:Int64, right:Int64):Int64 {
        return haxe.Int64.mod(left, right);
    }

    @:op(A % B) public static function mod_i_i64(left:Int, right:Int64):Int64 {
        return mod(left, right);
    }

    @:op(A % B) public static function mod_i64_i(left:Int64, right:Int):Int64 {
        return mod(left, right);
    }

    @:op(A < B) public static function lessThan(left:Int64, right:Int64):Bool {
        return haxe.Int64.compare(left, right) < 0;
    }

    @:op(A < B) public static function lessThan_i_i64(left:Int, right:Int64):Bool {
        return lessThan(left, right);
    }

    @:op(A < B) public static function lessThan_i64_i(left:Int64, right:Int):Bool {
        return lessThan(left, right);
    }

    @:op(A <= B) public static function lessEquals(left:Int64, right:Int64):Bool {
        return haxe.Int64.compare(left, right) <= 0;
    }

    @:op(A <= B) public static function lessEquals_i_i64(left:Int, right:Int64):Bool {
        return lessEquals(left, right);
    }

    @:op(A <= B) public static function lessEquals_i64_i(left:Int64, right:Int):Bool {
        return lessEquals(left, right);
    }

    @:op(A > B) public static function greaterThan(left:Int64, right:Int64):Bool {
        return haxe.Int64.compare(left, right) < 0;
    }

    @:op(A > B) public static function greaterThan_i_i64(left:Int, right:Int64):Bool {
        return greaterThan(left, right);
    }

    @:op(A > B) public static function greaterThan_i64_i(left:Int64, right:Int):Bool {
        return greaterThan(left, right);
    }

    @:op(A >= B) public static function greaterEquals(left:Int64, right:Int64):Bool {
        return haxe.Int64.compare(left, right) <= 0;
    }

    @:op(A >= B) public static function greaterEquals_i_i64(left:Int, right:Int64):Bool {
        return greaterEquals(left, right);
    }

    @:op(A >= B) public static function greaterEquals_i64_i(left:Int64, right:Int):Bool {
        return greaterEquals(left, right);
    }

    @:op(A == B) public static function equals(left:Int64, right:Int64):Bool {
        return haxe.Int64.compare(left, right) == 0;
    }

    @:op(A == B) public static function equals_i_i64(left:Int, right:Int64):Bool {
        return equals(left, right);
    }

    @:op(A == B) public static function equals_i64_i(left:Int64, right:Int):Bool {
        return equals(left, right);
    }

    @:op(A != B) public static function notEquals(left:Int64, right:Int64):Bool {
        return haxe.Int64.compare(left, right) != 0;
    }

    @:op(A != B) public static function notEquals_i_i64(left:Int, right:Int64):Bool {
        return notEquals(left, right);
    }

    @:op(A != B) public static function notEquals_i64_i(left:Int64, right:Int):Bool {
        return notEquals(left, right);
    }

    @:op(A & B) public static function and(left:Int64, right:Int64):Int64 {
        return haxe.Int64.and(left, right);
    }

    @:op(A & B) public static function and_i_i64(left:Int, right:Int64):Int64 {
        return and(left, right);
    }

    @:op(A & B) public static function and_i64_i(left:Int64, right:Int):Int64 {
        return and(left, right);
    }

    @:op(A | B) public static function or(left:Int64, right:Int64):Int64 {
        return haxe.Int64.or(left, right);
    }

    @:op(A | B) public static function or_i_i64(left:Int, right:Int64):Int64 {
        return or(left, right);
    }

    @:op(A | B) public static function or_i64_i(left:Int64, right:Int):Int64 {
        return or(left, right);
    }

    @:op(A ^ B) public static function xor(left:Int64, right:Int64):Int64 {
        return haxe.Int64.xor(left, right);
    }

    @:op(A ^ B) public static function xor_i_i64(left:Int, right:Int64):Int64 {
        return xor(left, right);
    }

    @:op(A ^ B) public static function xor_i64_i(left:Int64, right:Int):Int64 {
        return xor(left, right);
    }

    @:op(A >> B) public static function shr(left:Int64, right:Int):Int64 {
        return haxe.Int64.shr(left, right);
    }

    @:op(A >>> B) public static function ushr(left:Int64, right:Int):Int64 {
        return haxe.Int64.ushr(left, right);
    }

    @:op(A << B) public static function shl(left:Int64, right:Int):Int64 {
        return haxe.Int64.shl(left, right);
    }

}
