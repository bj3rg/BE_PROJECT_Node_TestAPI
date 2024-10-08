const express = require("express");
const router = express.Router();
const validation = require("../../middleware/validationMiddleware");
const { body, param } = require("express-validator");

// Imports the User Controller
const {
  findUser,
  signUp,
  logIn,
  updateUser,
  verifyUser,
} = require("../../controllers/user-controller");

// List of http request methods

// router.post(                                                   ---> HTTP request type (POST,GET,PUT,PATCH,DELETE)
//   "/login",                                                    ---> Endpoint
//   [body("username").notEmpty(), body("password").notEmpty()],  ---> body/params
//   validation,                                                  ---> Input Validator
//   logIn                                                        ---> User Controller Function
// );

router.post(
  "/login",
  [body("username").notEmpty(), body("password").notEmpty()],
  validation,
  logIn
);

router.post(
  "/verify-user/:id",
  [body("code").notEmpty(), param("id").notEmpty()],
  verifyUser
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
