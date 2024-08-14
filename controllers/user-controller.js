const deleteFile = require("../helpers/deleteFile");
const sendOTP = require("../helpers/emailTransporter");
const randomCode = require("../helpers/OtpGenerator");
const User = require("../models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const saltRounds = 10;

//Sign Up function
exports.signUp = (req, res, next) => {
  const { username, password } = req.body;
  // Find user by username
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) {
        // Apply salting on password
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            return err;
          } else {
            // Apply hashing of salted password
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                return err;
              }
              const OTP = randomCode();
              // Create new User
              sendOTP(username, OTP);
              User.create({
                username: username,
                password: hash,
                verificationCode: OTP,
              }).then(() => {
                return res.status(200).json({
                  success: true,
                  message: "User created successfully",
                });
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "User with the same email already exists",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Login function
exports.logIn = (req, res, next) => {
  const { username, password } = req.body;
  // Find user by username
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User does not exist" });
      }
      if (user.isVerified === false) {
        return res
          .status(401)
          .json({ success: false, message: "User not verified" });
      }
      // Use compare method of bcrypt to check password === existing password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return err;
        }
        if (result) {
          // Create new token for user after successful login
          const token = jwt.sign(
            { username: username }, //Always enclose it with {} to make it as object
            process.env.SECRETKEY,

            {
              expiresIn: "1h", //Expiration of token, can be 1s, 30m, 1h, 1d, and etc
            }
          );
          console.log(token);
          // Updates the token field in the User's schema
          user.token = token;
          user.save();
          return (
            res
              .status(200)
              // Send token to header as cookie (???)
              .cookie("token", token, { httpOnly: true })
              .json({
                message: "Successfully logged in",
                first_name: user.id,
                token: token,
              })
          );
        }
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.verifyUser = (req, res, next) => {
  const { code } = req.body;
  const { id } = req.params;
  User.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log("Here");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const userStoredCode = user.verificationCode;
      if (userStoredCode === code) {
        user.isVerified = true;
        user.save();
        return res.status(200).json({
          message: "Successfully verified",
        });
      } else {
        return res.status(400).json({
          message: "Code does not match please try again",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Update User
exports.updateUser = (req, res, next) => {
  const { username } = req.params;
  const { first_name, last_name, age, email } = req.body;

  // If no image uploaded, return error
  if (!req.files.user_img) {
    return res.status(401).json({
      message: "No image is selected",
    });
  }
  // Access or get the first file in the array of items in user_img field
  const user_img = req.files.user_img[0];

  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      // If no user found
      if (!user) {
        // Uploaded image is deleted using deleteFile helpers and return error
        deleteFile(user_img.filename, "profile-upload");
        return res
          .status(400)
          .json({ success: false, message: "User with the same email exist" });
      }
      // If user exists, get the old image of the user
      const oldUser_img = user.user_img;
      // Delete the old image of the user
      if (oldUser_img) {
        deleteFile(oldUser_img, "profile-upload");
      }

      // Updates the requested fields
      user.first_name = first_name;
      user.last_name = last_name;
      user.age = age;
      user.email = email;
      // use .filename and || null since it is a file type
      user.user_img = user_img.filename || null;
      return user.save();
    })
    .then(() => {
      return res.status(200).json({ message: "Successfully updated" });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// Find User function
exports.findUser = (req, res, next) => {
  const { username } = req.params;
  // Find user by username
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      // If not found, return error
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User does not exist" });
      } else {
        // Else if found, return user data
        return res.status(200).json({ user });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
