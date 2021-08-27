const config = require("config");
const logger = require("./logger");
module.exports = () => {
  if (!config.get("jwtPrivateKey")) {
    logger.error("FATAL ERROR : jwt Private key is undefined");
    process.exit(1);
  }
};
