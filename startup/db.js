const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => logger.info("Connected to Mongodb..."));
};
