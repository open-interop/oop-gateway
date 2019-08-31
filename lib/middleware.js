module.exports = function(req, res, next) {
    if (!(req.headers["content-type"] || "").includes("text/plain")) {
        return next();
    }

    if (!req.headers["content-length"]) {
        return next();
    }

    var data = "";

    req.setEncoding("utf-8");
    req.on("data", chunk => {
        data += chunk;
    });

    req.on("end", () => {
        req.body = data;
        return next();
    });
};
