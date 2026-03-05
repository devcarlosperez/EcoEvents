module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const { verifyToken, isAdmin } = require("../middlewares/auth.js");

  const router = require("express").Router();

  router.post("/login", users.login);

  router.post("/", users.create);

  router.get("/:id", verifyToken, users.findOne);
  
  router.get("/", verifyToken, isAdmin, users.findAll);

  router.put("/:id", verifyToken, users.update);

  router.delete("/:id", verifyToken, users.delete);

  app.use("/api/users", router);
};
