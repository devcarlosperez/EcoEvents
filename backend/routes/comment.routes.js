module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");

  const router = require("express").Router();

  router.post("/", comments.create);

  router.get("/", comments.findAll);

  router.get("/:id", comments.findOne);

  router.put("/:id", comments.update);

  router.delete("/:id", comments.delete);

  app.use("/api/comments", router);
};
