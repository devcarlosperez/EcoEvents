module.exports = app => {
  const eventParticipants = require("../controllers/event-participant.controller.js");

  var router = require("express").Router();

  router.post("/", eventParticipants.create);

  router.get("/", eventParticipants.findAll);

  router.get("/:id", eventParticipants.findOne);

  router.put("/:id", eventParticipants.update);

  router.delete("/:id", eventParticipants.delete);

  app.use('/api/event-participants', router);
};
