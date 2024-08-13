const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 50, // 100 request limit per 1 minute
  message: "Too many requests from this IP, please try again later",
});
