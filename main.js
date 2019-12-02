const express = require("express");
const fileUpload = require("express-fileupload");
const expressCsv = require("express-csv-middleware");
const expressXml = require("express-xml-bodyparser");

const textMiddleware = require("./lib/middleware");
const handler = require("./lib/handler");
const blacklist = require("./lib/blacklist");

module.exports = (broker, config, logger) => {
    const app = express();

    app.use(blacklist(config, logger));
    app.use(fileUpload());
    app.use(express.json({type: ['application/json', 'application/fhir+json']}));
    app.use(express.urlencoded({ extended: true }));
    app.use(expressCsv());
    app.use(expressXml());
    app.use(textMiddleware);
    app.use(logger.middleware);

    app.all("/*", handler(broker, config, logger));

    app.listen(config.listenPort, () =>
        console.log(`Listening on port ${config.listenPort}!`)
    );
};
