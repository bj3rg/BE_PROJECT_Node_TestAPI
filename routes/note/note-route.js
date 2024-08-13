const express = require("express");
const router = express.Router();
const validation = require("../../middleware/validationMiddleware");
const { body, param } = require("express-validator");

const { createNote } = require("../../controllers/note-controller");

router.post(
  "/create-note",
  //   [body("title").notEmpty(), body("message").notEmpty()],
  createNote
);

module.exports = router;
