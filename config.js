const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    listenPort: process.env.LISTEN_PORT,
    amqpAddress: process.env.AMQP_ADDRESS,
    exchangeName: process.env.EXCHANGE_NAME,
    rawMessageQ: process.env.RAW_MESSAGE_Q,
    dbAddress: process.env.DB_ADDRESS
};
