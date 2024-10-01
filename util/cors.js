const cors = require("cors");

module.exports = cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
});

// module.exports = (req, res, next) => {
//   res.setHeaders(
//     "Access-Control-Allow-Methods",
//     "GET",
//     "POST",
//     "PUT",
//     "PATCH",
//     "DELETE"
//   );
//   res.setHeaders("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// };
