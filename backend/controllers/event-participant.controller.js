const db = require("../models");
const eventParticipantObject = db.eventParticipant;

exports.create = (req, res) => {
  if (!req.body.user_id || !req.body.event_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const eventParticipant = {
    user_id: req.body.user_id,
    event_id: req.body.event_id
  };

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
  const id = req.params.id;

  eventParticipantObject.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "EventParticipant was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update EventParticipant with id=${id}. Maybe EventParticipant was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating EventParticipant with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  eventParticipantObject.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "EventParticipant was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete EventParticipant with id=${id}. Maybe EventParticipant was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete EventParticipant with id=" + id
      });
    });
};
