module.exports = app => {
  const eventParticipants = require("../controllers/event-participant.controller.js");
  const { verifyToken } = require("../middlewares/auth.js");

  const router = require("express").Router();

  router.post("/", verifyToken, eventParticipants.create);

  router.get("/", verifyToken, eventParticipants.findAll);

  router.get("/:id", verifyToken, eventParticipants.findOne);

  router.put("/:id", verifyToken, eventParticipants.update);
  
  router.delete("/:id", verifyToken, eventParticipants.delete);

  app.use('/api/event-participants', router);
};
