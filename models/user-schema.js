const Sequelize = require("sequelize");
const connection = require("../database/connection");
const { type } = require("os");

// Schema/Table
const User = connection.define(
  "User",
  {
    id: {
      type: Sequelize.UUID, // Sets the ID to UUID
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    user_img: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    verificationCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "User",
    timestamps: true,
  }
);

module.exports = User;
