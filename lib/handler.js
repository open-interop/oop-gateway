const uuidv4 = require("uuid/v4");

const uuid = uuidv4;

var handler = (messageBroker, config, logger) => {
    return (req, res) => {
        var message = {
            uuid: uuid(),
            message: getMessageFromRequest(req)
        };

        messageBroker
            .publish(config.exchangeName, config.gatewayOutputQ, message)
            .then(() => {
                res.status(202);

                if (
                    "content-type" in req.headers &&
                    req.headers["content-type"] === "application/json"
                ) {
                    res.setHeader("Content-Type", "application/json");

                    res.write(
                        JSON.stringify({
                            messageUuid: message.uuid,
                            status: "success"
                        })
                    );
                }
            })
            .catch(err => {
                logger.error(err);
                res.status(500);
            })
            .finally(() => res.end());
    };
};

var getMessageFromRequest = function(req) {
    var msg = {
        path: req.path,
        query: req.query,
        method: req.method,
        ip: req.ip,
        body: req.body,
        files: req.files,
        headers: req.headers,
        hostname: req.hostname,
        port: req.port,
        protocol: req.protocol
    };

    if (msg.files) {
        for (const key of Object.keys(msg.files)) {
            msg.files[key].data = msg.files[key].data.toString("base64");
        }
    }

    return msg;
};

module.exports = handler;
