const net = require("net");
const uuidv4 = require("uuid/v4");

const parseAddress = address => {
    const [scheme, path] = address.split("://");
    if (scheme === "tcp") {
        const [host, port] = path.split(":");

        return { host, port };
    } else if (scheme === "unix" ) {
        return path;
    } else {
        throw new Error(`Could not parse blacklist address: ${address}`);
    }
};

module.exports = (config, logger) => {
    const searching = {};
    let buffer = "";

    const blacklist = new Promise(resolve => {
        var s = net.connect(parseAddress(config.blacklistAddress));

        s
            .setEncoding("binary")
            .setNoDelay(true);

        s.on("data", data => {
            buffer += data;

            handleBuffer();
        });

        resolve(s);
    });

    const handleBuffer = () => {
        let index;

        while ((index = buffer.indexOf("\0")) > -1) {
            const message = buffer.slice(0, index);

            try {
                const json = JSON.parse(message);

                if (!searching[json.Uuid]) {
                    throw new Error(`Could not find ${json.uuid} in searching.`);
                }

                searching[json.Uuid](json.Blacklisted);
            } catch (e) {
                logger.error(e);
            }

            buffer = buffer.slice(index + 1);
        }
    };

    const isBlacklisted = async req => {
        const uuid = uuidv4();
        let p = new Promise(resolve => { searching[uuid] = resolve; });

        const s = await blacklist;

        json = JSON.stringify({
            uuid,
            ip: req.ip,
            path: req.path,
            headers: req.headers,
            protocol: req.protocol,
        });

        s.write(json + "\0", "binary");

        return p;
    };

    return function(req, res, next) {
        return isBlacklisted(req)
            .then(result => {
                if (result) {
                    res.status(444).end();
                } else {
                    next();
                }
            })
            .catch((err) => {
                logger.error(err);
                next();
            });
    };
};
