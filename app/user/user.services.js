const User = require("./user.model");

class UserService {
  async create(user) {
    try {
      //console.log(user);
      const newUser = new User(user);
      return await newUser.generateAuthToken();
    } catch (error) {
      console.log("error " + error);
      return error;
    }
  }

  async login(email, password) {
    try {
      const user = await User.findByCredentials(email, password);
      return user;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserService();
