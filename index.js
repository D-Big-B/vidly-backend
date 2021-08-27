const express = require("express");
const logger = require("./startup/logger");
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/processError")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  logger.info(`Server is running at ${port}.....`);
});
