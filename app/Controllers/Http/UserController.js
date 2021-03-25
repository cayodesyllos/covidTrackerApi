"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request, response, auth }) {
    const data = request.only(["email", "password"]);
    try {
      await User.create(data);

      const token = await auth.attempt(email, password);

      return token;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserController;
