const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
// Initialization of database
const sequelizeConnect = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

// function is exported
module.exports = sequelizeConnect;
