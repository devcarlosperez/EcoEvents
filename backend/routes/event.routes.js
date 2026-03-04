const upload = require("../services/multer.js");

module.exports = app => {
  const events = require("../controllers/event.controller.js");

  var router = require("express").Router();

  router.post("/", upload.single('image'), events.create);

  router.get("/", events.findAll);

  router.get("/:id", events.findOne);

  router.put("/:id", upload.single('image'), events.update);

  router.delete("/:id", events.delete);

  app.use('/api/events', router);
};
