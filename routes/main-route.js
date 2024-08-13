const express = require("express");
const router = express.Router();

// Route imports from the folder
const userRoute = require("./user/user");

// Endpoint route initialization
router.use("/user", userRoute);

module.exports = router;
