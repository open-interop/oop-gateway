const express = require("express");
const fileUpload = require("express-fileupload");
const { loggerMiddleware } = require("./logger");
const { listenPort } = require("./config");
const handler = require("./handler");

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.get("/*", handler);
app.post("/*", handler);

app.listen(listenPort, () => console.log(`Listening on port ${listenPort}!`));
