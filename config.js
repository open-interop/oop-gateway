const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    listenPort: process.env.OOP_LISTEN_PORT,
    amqpAddress: process.env.OOP_AMQP_ADDRESS,
    exchangeName: process.env.OOP_EXCHANGE_NAME,
    gatewayOutputQ: process.env.OOP_GATEWAY_OUTPUT_Q,
    dbAddress: process.env.OOP_DB_ADDRESS
};
