"use strict";
const User = use("App/Models/User");
const Event = use("Event");

class UserController {
  async store({ request, response, auth }) {
    const data = request.only(["email", "password"]);
    try {
      await User.create(data);

      const token = await auth.attempt(data.email, data.password);

      return token;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }

  async update({ request, response, auth }) {
    const { infected } = request.only(["infected"]);

    try {
      auth.user.infected = infected;
      await auth.user.save();

      if (infected) {
        Event.fire("user::updateStatus", auth.user.id);
      }

      return;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }

  async index({ response, auth }) {
    try {
      return auth.user;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserController;
