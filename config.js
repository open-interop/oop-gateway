const oop = require("oop-node-common");

module.exports = new oop.Config({
    listenPort: "OOP_LISTEN_PORT",
    amqpAddress: "OOP_AMQP_ADDRESS",
    exchangeName: "OOP_EXCHANGE_NAME",
    gatewayOutputQ: "OOP_GATEWAY_OUTPUT_Q",
    dbAddress: "OOP_DB_ADDRESS"
});
