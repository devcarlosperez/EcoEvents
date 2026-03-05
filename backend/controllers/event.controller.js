const db = require("../models");
const fs = require("fs");
const eventObject = db.event;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const event = {
    creator_id: req.user.id,
    name: req.body.name,
    description: req.body.description,
    event_type: req.body.event_type,
    event_date: req.body.event_date,
    event_time: req.body.event_time,
    location: req.body.location,
    image_url: req.file ? req.file.filename : null,
    max_participants: req.body.max_participants
  };

  eventObject.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    });
};

exports.findAll = (req, res) => {
  eventObject.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  eventObject.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  
  const event = {
    name: req.body.name,
    description: req.body.description,
    event_type: req.body.event_type,
    event_date: req.body.event_date,
    event_time: req.body.event_time,
    location: req.body.location,
    max_participants: req.body.max_participants
  };

  if (req.file) {
    event.image_url = req.file.filename;
  }

  eventObject.update(event, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};

exports.updateStatus = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  eventObject.update({ status }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event status was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update status of Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating status of Event with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  eventObject.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
        return;
      }

      eventObject.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            if (data.image_url) {
              const imagePath = __dirname + "/../public/images/" + data.image_url;
              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.log("Could not delete image file: " + err);
                }
              });
            }

            res.send({
              message: "Event was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Event with id=${id}.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Event with id=" + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id
      });
    });
};
