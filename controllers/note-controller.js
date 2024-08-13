const Note = require("../models/note-schema");
// Login function
exports.createNote = (req, res, next) => {};

// Update Note by ID
exports.updateNote = (req, res, next) => {
  const { title, message } = req.body;
  const { id } = req.params;
  Note.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      } else {
        // Update body column of Note by id
        return Note.update(
          {
            title: title,
            message: message,
          },
          {
            where: {
              id: id,
            },
          }
        ).then(() => {
          return res.status(200).json({ message: "Note updated successfully" });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Find Note by ID
exports.findNoteByID = (req, res, next) => {
  const { id } = req.params;
  Note.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Note with the given ID does not exist",
        });
      } else {
        // Returns user_id and note-info
        return res.status(200).json({
          user_id: data.user_id,
          title: data.title,
          message: data.message,
          createdAt: data.createdAt,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Delete all notes of user
exports.deleteAllNoteByUserId = (req, res, next) => {
  const { user_id } = req.params;
  // Calls destroy method with where clause
  Note.findAll({
    where: {
      user_id: user_id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      } else {
        Note.destroy({
          where: {
            user_id: user_id,
          },
        }).then(() => {
          return res
            .status(204)
            .json({ message: "All notes successfully deleted " });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};
