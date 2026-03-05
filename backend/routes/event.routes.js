module.exports = app => {
  const events = require("../controllers/event.controller.js");
  const upload = require("../middlewares/multer.js");
  const { verifyToken, isAdmin } = require("../middlewares/auth.js");

  const router = require("express").Router();

  router.post("/", verifyToken, upload.single('image'), events.create);

  router.get("/", verifyToken, events.findAll);

  router.get("/:id", verifyToken, events.findOne);

  router.put("/:id", verifyToken, isAdmin, upload.single('image'), events.update);

  router.patch("/status/:id", verifyToken, isAdmin, events.updateStatus);

  router.delete("/:id", verifyToken, isAdmin, events.delete);

  app.use('/api/events', router);
};
