const logger = require("../startup/logger");
module.exports = (error, req, res, next) => {
  //logging Error
  logger.error(error.message, error);
  res.status(500).send("Something Went Wrong...");
};
