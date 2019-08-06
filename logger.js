const winston = require("winston");

const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
};

const logger = new winston.createLogger(myWinstonOptions);

const middleware = function(req, res, next) {
    logger.info(req.url);
    next();
};

module.exports = {
    logger: logger,
    loggerMiddleware: middleware
};
