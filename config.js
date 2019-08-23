const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    listenPort: process.env.OOP_LISTEN_PORT,
    amqpAddress: process.env.OOP_AMQP_ADDRESS,
    exchangeName: process.env.OOP_EXCHANGE_NAME,
    rawMessageQ: process.env.OOP_NOAUTH_RAW_MESSAGE_Q,
    dbAddress: process.env.OOP_DB_ADDRESS
};
