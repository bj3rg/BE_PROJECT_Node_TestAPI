const express = require("express");
const router = express.Router();
const validation = require("../../middleware/validationMiddleware");
const { body, param } = require("express-validator");

const {
  createNote,
  updateNote,
  deleteAllNoteByUserId,
  findNoteByID,
} = require("../../controllers/note-controller");

router.post(
  "/create-note",
  //   [body("title").notEmpty(), body("message").notEmpty()],
  createNote
);

// Update note by id
router.put(
  "/update/:id",
  [body("title").notEmpty(), body("message").notEmpty()],
  validation,
  updateNote
);

// Delete all note by user_id
router.delete(
  "/delete-all/:user_id",
  [param("user_id").notEmpty()],
  deleteAllNoteByUserId
);

// Get note by id
router.get("/:id", [param("id").notEmpty()], validation, findNoteByID);

module.exports = router;
