const db = require("../models");
const eventParticipantObject = db.eventParticipant;

exports.create = (req, res) => {
  if (!req.body.event_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const eventParticipant = {
    user_id: req.user.id,
    event_id: req.body.event_id
  };

  eventParticipantObject.findOne({
    where: {
      user_id: eventParticipant.user_id,
      event_id: eventParticipant.event_id
    }
  }).then(existing => {
    if (existing) {
      res.status(400).send({
        message: "User is already participating in this event."
      });
      return;
    }

    eventParticipantObject.create(eventParticipant)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the EventParticipant."
        });
      });
  }).catch(err => {
    res.status(500).send({
      message: "Error checking participation status."
    });
  });
};

exports.findAll = (req, res) => {
  eventParticipantObject.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving event participants."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  eventParticipantObject.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EventParticipant with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving EventParticipant with id=" + id
      });
    });
};

exports.update = (req, res) => {
  res.status(400).send({
    message: "Updating a participation is not allowed."
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  eventParticipantObject.findByPk(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot find EventParticipant with id=${id}.`
        });
      }

      if (data.user_id !== req.user.id && req.user.role !== "admin") {
        return res.status(403).send({
          message: "You can only cancel your own participation."
        });
      }

      eventParticipantObject.destroy({ where: { id: id } })
        .then(() => {
          res.send({ message: "EventParticipant was deleted successfully!" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete EventParticipant with id=" + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving EventParticipant with id=" + id
      });
    });
};
