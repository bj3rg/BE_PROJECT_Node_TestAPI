const deleteFile = require("../helpers/deleteFile");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.signUp = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            return err;
          } else {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                return err;
              }
              return User.create({
                username: username,
                password: hash,
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

exports.logIn = (req, res, next) => {
  const { username, password } = req.body;
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
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return err;
        }
        if (result) {
          return res.status(200).json({
            message: "Successfully logged in",
            first_name: user.id,
          });
        }
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { username } = req.params;
  const { first_name, last_name, age } = req.body;

  if (!req.files.user_img) {
    return res.status(401).json({
      message: "No image is selected",
    });
  }

  const user_img = req.files.user_img[0];
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User with the same email exist" });
      }
      const oldUser_img = user.user_img;
      if (oldUser_img) {
        deleteFile(oldUser_img, "profile-upload");
      }
      (user.user_img = user_img),
        (user.first_name = first_name),
        (user.last_name = last_name),
        (user.age = age);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.findUser = (req, res, next) => {
  const { username } = req.params;
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
      } else {
        return res.status(200).json({ user });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
