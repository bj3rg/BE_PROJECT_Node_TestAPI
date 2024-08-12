const User = require("../models/user");

exports.createUser = (req, res, next) => {
  const { first_name, last_name, age, email } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return User.create({
          first_name: first_name,
          last_name: last_name,
          age: age,
          email: email,
        }).then((data) => {
          return res
            .status(200)
            .json({ success: true, message: "Successfully created", data });
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User with the same email exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.findUser = (req, res, next) => {
  const { email } = req.params;
  User.findOne({
    where: {
      email: email,
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
