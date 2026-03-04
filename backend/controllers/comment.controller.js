const db = require("../models");
const commentObject = db.comment; 

exports.create = (req, res) => {
    const userId = req.body.user_id;
    const eventId = req.body.event_id;
    const commentText = req.body.comment;

    const comment = {
        user_id: userId,
        event_id: eventId,
        comment: commentText
    };

    commentObject.create(comment).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the comment."
        });
    });
};

exports.findAll = (req, res) => {
  commentObject
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving comments.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  commentObject
    .findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving the comment.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const commentText = req.body.comment;

  const comment = {
    comment: commentText
  };

  commentObject
    .update(comment, { where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while updating the comment.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  commentObject
    .destroy({ where: { id: id } })
    .then((data) => {
      res.send({
        message: "Comment has been deleted.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while deleting the comment.",
      });
    });
};