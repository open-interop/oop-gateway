import test from "ava";

var blacklist = require("./blacklist");

test("IPv4", t => {
    t.plan(1);

    var ip = "127.0.0.1";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "0000:0000:0000:ffff:0127:0000:0000:0001");
});

test("Mixed IPv4 and IPv6", t => {
    t.plan(1);

    var ip = "::ffff:127.0.0.1";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "0000:0000:0000:ffff:0127:0000:0000:0001");
});

test("Empty IPv6", t => {
    t.plan(1);

    var ip = "::";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "0000:0000:0000:0000:0000:0000:0000:0000");
});

test("Last 6 segments 0", t => {
    t.plan(1);

    var ip = "2001:db8::";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "2001:0db8:0000:0000:0000:0000:0000:0000");
});

test("First 6 segments 0", t => {
    t.plan(1);

    var ip = "::1234:5678";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "0000:0000:0000:0000:0000:0000:1234:5678");
});

test("Middle 4 segments 0", t => {
    t.plan(1);

    var ip = "2001:db8::1234:5678";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "2001:0db8:0000:0000:0000:0000:1234:5678");
});

test("Converted to lower case", t => {
    t.plan(1);

    var ip = "2001:0DB8:0001:0000:0000:0AB9:C0A8:0102";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "2001:0db8:0001:0000:0000:0ab9:c0a8:0102");
});

test("Spaces removed", t => {
    t.plan(1);

    var ip = "  2001: 0db 8:000 1:00 00:0 00 0: 0ab9 : c0a8 : 0102 ";
    var result = blacklist.toComparisonString(ip);
    t.is(result, "2001:0db8:0001:0000:0000:0ab9:c0a8:0102");
});
