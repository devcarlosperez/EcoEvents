const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

      const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).send({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        token: token
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
};

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
  const id = req.params.id;

  if (req.user.id !== id && req.user.role !== "admin") {
    return res.status(403).send({ message: "You can only view your own profile." });
  }

  userObject
    .findOne({ where: { id: id } })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "User not found." });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving the user.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;

  if (req.user.id !== id && req.user.role !== "admin") {
    return res.status(403).send({ message: "You can only update your own profile." });
  }

  const user = {
    name: name,
    surname: surname,
    email: email,
  };

  if (password) {
    user.password = bcrypt.hashSync(password, 8);
  }

  userObject
    .update(user, { where: { id: id } })
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
  const id = req.params.id;

  if (req.user.id !== id && req.user.role !== "admin") {
    return res.status(403).send({ message: "You can only delete your own profile." });
  }

  userObject
    .destroy({ where: { id: id } })
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
