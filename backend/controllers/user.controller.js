const db = require("../models");
const bcrypt = require("bcryptjs");
const userObject = db.users;

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userObject.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password."
        });
      }

      res.status(200).send({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.create = (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const role = "user";

    const user = {
        name: name,
        surname: surname,
        email: email,
        password: bcrypt.hashSync(password, 8),
        role: role
    };

    userObject.create(user).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
}

exports.findAll = (req, res) => {
  userObject
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving users.",
      });
    });
};

exports.findOne = (req, res) => {
  const userId = req.params.id;

  userObject
    .findOne({ where: { id: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving the user.",
      });
    });
};

exports.update = (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;

  const user = {
    name: name,
    surname: surname,
    email: email,
  };

  if (password) {
    user.password = bcrypt.hashSync(password, 8);
  }

  userObject
    .update(user, { where: { id: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while updating the user.",
      });
    });
};

exports.delete = (req, res) => {
  const userId = req.params.id;

  userObject
    .destroy({ where: { id: userId } })
    .then((data) => {
      res.send({
        message: "User has been deleted.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while deleting the user.",
      });
    });
};
