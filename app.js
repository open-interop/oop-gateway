const express = require("express");
const fileUpload = require("express-fileupload");
const expressCsv = require('express-csv-middleware');
const expressXml = require('express-xml-bodyparser');
const textMiddleware = require("./middleware");
const handler = require("./handler");

const { loggerMiddleware } = require("./logger");
const { listenPort } = require("./config");

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressCsv());
app.use(expressXml());
app.use(textMiddleware);
app.use(loggerMiddleware);

app.get("/*", handler);
app.post("/*", handler);

app.listen(listenPort, () => console.log(`Listening on port ${listenPort}!`));
