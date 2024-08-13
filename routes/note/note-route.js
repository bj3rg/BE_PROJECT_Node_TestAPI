const express = require("express");
const router = express.Router();
const validation = require("../../middleware/validationMiddleware");
const { body, param } = require("express-validator");

const {
  createNote,
  updateNote,
  deleteNote,
  deleteAllNoteByUserId,
  findNoteByID,
  findAllNoteByUserId,
} = require("../../controllers/note-controller");

router.post(
  "/create-note/:id",
  [
    param("id").notEmpty(),
    body("title").notEmpty(),
    body("message").notEmpty(),
  ],
  validation,
  createNote
);

// Update note by id
router.put(
  "/update/:id",
  [body("title").notEmpty(), body("message").notEmpty()],
  validation,
  updateNote
);

//  Delete note by id
router.delete("/delete/:id", [param("id").notEmpty()], deleteNote);

// Delete all note by user_id
router.delete(
  "/delete-all/:user_id",
  [param("user_id").notEmpty()],
  deleteAllNoteByUserId
);

// Get note by id
router.get("/:id", [param("id").notEmpty()], validation, findNoteByID);

router.get(
  "/find-all/:user_id",
  [param("user_id").notEmpty()],
  findAllNoteByUserId
);

module.exports = router;
