const express = require("express");
const router = express.Router();

// Route imports from the folder
const userRoute = require("./user/user-route");
const noteRoute = require("./note/note-route");

// Endpoint route initialization
router.use("/user", userRoute);
router.use("/note", noteRoute);

module.exports = router;
