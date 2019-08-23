const amqp = require("amqplib");
const config = require("./config");
const { logger } = require("./logger");
const uuidv4 = require("uuid/v4");

const uuid = uuidv4;
var connection;
var channel;

const reconnect = async () => {
    connection = await amqp.connect(config.amqpAddress);
    channel = await connection.createChannel();

    return channel;
};

reconnect();

var handler = (req, res) => {
    var msg = getMessageFromRequest(req);

    queueRawMessage(msg)
        .then(() => res.status(202))
        .catch(err => {
            logger.error(String(err));
            res.status(500);
        })
        .finally(() => res.end());
};

var queueRawMessage = async function(msg) {
    var ch = await channel;

    if (!ch) {
        ch = await reconnect();
    }

    var json = JSON.stringify({
        uuid: uuid(),
        message: msg
    });

    if (
        !ch.publish(config.exchangeName, config.rawMessageQ, Buffer.from(json))
    ) {
        throw new Error(`Unable to publish message: ${json}`);
    }
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
