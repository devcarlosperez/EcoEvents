module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  const { verifyToken } = require("../middlewares/auth.js");

  const router = require("express").Router();

  router.post("/", verifyToken, comments.create);

  router.get("/", verifyToken, comments.findAll);

  router.get("/:id", verifyToken, comments.findOne);

  router.put("/:id", verifyToken, comments.update);
  
  router.delete("/:id", verifyToken, comments.delete);

  app.use("/api/comments", router);
};
