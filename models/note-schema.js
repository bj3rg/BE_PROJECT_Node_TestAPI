const Sequelize = require("sequelize");
const connection = require("../database/connection");
const User = require("../models/user-schema");

// Schema/Table
const Note = connection.define(
  "Note",
  {
    id: {
      type: Sequelize.UUID, // Sets the ID to UUID
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "User",
    timestamps: true,
  }
);

Note.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "note",
});

module.exports = Note;
