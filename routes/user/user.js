const express = require("express");
const router = express.Router();
const validation = require("../../middleware/validationMiddleware");
const { body, param } = require("express-validator");

const { createUser, findUser } = require("../../controllers/user");

router.post(
  "/create",
  [
    param("email").notEmpty(),
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("age").notEmpty(),
    body("email").notEmpty(),
  ],
  validation,
  createUser
);

router.get("/find/:email", [param("email").notEmpty()], validation, findUser);

module.exports = router;
