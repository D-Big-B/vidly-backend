require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logFile.log" }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" }),
  ],
});
