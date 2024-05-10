var express = require("express");
const userController = require("./user.controller");
const auth = require("../middleware/auth");
const User = require("./user.model");
var router = express.Router();

router.post("/user", userController.create);
router.post("/user/login", userController.login);
router.get("/user/me", auth, async (req, res) => {
  try {
    console.log("REQ USER", req.user);
    const user = new User(req.user);
    console.log("USER: " + user);
    res.status(200).send({ message: "profile", data: user });
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ message: "logout", data: req.user });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
