const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
  // Request the header -> authorization sent by the client
  var tokenBearer = req.headers.authorization;
  if (!tokenBearer) {
    return res.status(401).json({
      message: "User does not provide Token",
    });
  }
  //   Removes "Bearer" word on the returned data of tokenBearer
  const token = tokenBearer.split(" ")[1];
  try {
    // Verifies the token of user
    const user = jwt.verify(token, process.env.SECRETKEY);
    req.user = user;
    console.log("Authorized");
    next();
    // Clears cookie if not token is expired nor verified
  } catch (err) {
    res.clearCookie("token").status(401).json({
      message: "User unauthorized",
    });
  }
};

// NOT USED TOKEN VERIFIER - DO NOT DELETE
//   if (token) {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         res
//           .status(403)
//           .send({ success: false, message: "Failed to authenticate user." });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({ success: false, message: "No Token Provided." });
//   }
