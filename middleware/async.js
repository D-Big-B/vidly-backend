/**
 * if express-async-errors module do not work for any reason than
 * switch back to this approach
 */

module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
