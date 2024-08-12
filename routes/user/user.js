const express = require("express");
const router = express.Router();
const validation = require("../../middleware/validationMiddleware");
const { body, param } = require("express-validator");

const {
  createUser,
  findUser,
  signUp,
  logIn,
} = require("../../controllers/user");

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

router.post(
  "/login",
  [body("username").notEmpty(), body("password").notEmpty()],
  validation,
  logIn
);

router.post(
  "/sign-up",
  [body("username").notEmpty(), body("password").notEmpty()],
  validation,
  signUp
);

router.get("/find/:email", [param("email").notEmpty()], validation, findUser);

module.exports = router;
