const { logger } = require("./logger");
const { dbAddress } = require("./config");
const nano = require("nano")(dbAddress);

const blacklist = new Promise(resolve => {
    nano.db.get("blacklist", res => {
        if (res && res.status === 404) {
            resolve(nano.db.create("blacklist"));
        } else {
            resolve(nano.db.use("blacklist"));
        }
    });
});

module.exports = function(req, res, next) {
    return searchBlacklist(req).then(result => {
        if (result.docs.length) {
            logger.error(result.docs);
            res.status(444).end();
        } else {
            next();
        }
    });
};

var searchBlacklist = function(req) {
    var ipString = toComparisonString(req.ip);

    var selector = {
        $or: [
            { ip_literal: req.ip },
            {
                ip_range_start: { $lte: ipString },
                ip_range_end: { $gte: ipString }
            },
            { user_agent: req.headers["user-agent"] || "" },
            { request_path: req.path },
            { request_header: { $in: Object.keys(req.headers) } }
        ]
    };

    return blacklist.then(db => {
        return db.find({
            selector: selector,
            limit: 1
        });
    });
};

var toComparisonString = function(ip) {
    ip = ip
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/\./g, ":");

    if (/^\d{1,3}(:\d{1,3}){3}$/.test(ip)) {
        ip = "::ffff:" + ip;
    }

    var parts = ip
        .split(":")
        .map(x => (x.length === 0 ? x : x.padStart(4, "0")));

    var ret = [];

    while (parts.length) {
        var part = parts.shift();

        if (part === "") {
            while (ret.length + parts.length < 8) {
                ret.push("0000");
            }
        } else {
            ret.push(part);
        }
    }

    return ret.join(":");
};

module.exports.searchBlacklist = searchBlacklist;
module.exports.toComparisonString = toComparisonString;
