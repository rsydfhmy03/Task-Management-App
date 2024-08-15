const User = require('../models/user');

class UserService {
  static async createUser(userData) {
    return User.create(userData);
  }

  static async getUserById(userId) {
    return User.findByPk(userId);
  }
}

module.exports = UserService;
