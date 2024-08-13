const express = require("express");
const router = express.Router();
const validation = require("../../middleware/validationMiddleware");
const { body, param } = require("express-validator");

const {
  findUser,
  signUp,
  logIn,
  updateUser,
} = require("../../controllers/user");

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

router.get(
  "/find/:username",
  [param("username").notEmpty()],
  validation,
  findUser
);

router.put(
  "/updateUser/:username",
  [
    param("username").notEmpty(),
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("email").notEmpty(),
    body("age").notEmpty(),
    body("user_img").notEmpty(),
  ],
  // validation,
  updateUser
);

module.exports = router;
