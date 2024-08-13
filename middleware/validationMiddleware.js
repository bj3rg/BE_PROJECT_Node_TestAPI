const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  console.log(req.body);
  // Feeds the request body
  const errors = validationResult(req);
  // If there are errors, return invalid request
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Request");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  next();
};
