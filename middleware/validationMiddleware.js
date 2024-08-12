const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Request");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  next();
};
