const User = require("./user.model");
const UserService = require("./user.services");

class UserController {
  async create(req, res) {
    //console.log("controller");
    const user = new User(req.body);
    try {
      const token = await UserService.create(req.body);
      res.status(201).json({ message: "created", data: user, token: token });
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.login(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.status(200).json({ message: "found", data: user, token: token });
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }
}

module.exports = new UserController();
