const logger = require("./logger");

module.exports = () => {
  process.on("uncaughtException", (error) => {
    logger.error(error.message, error);
    process.exit(1);
  });

  process.on("unhandledRejection", (error) => {
    logger.error(error.message, error);
    process.exit(1);
  });
};
