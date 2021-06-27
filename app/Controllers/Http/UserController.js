"use strict";
const User = use("App/Models/User");
const UserInfection = use("App/Models/UserInfection");
const Event = use("Event");

class UserController {
  async store({ request, response, auth }) {
    const data = request.only(["email", "password", "sex", "birthday"]);
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
    const { infected, fcm_token, agreed } = request.only([
      "infected",
      "fcm_token",
      "agreed",
    ]);

    try {
      if (agreed != null) {
        auth.user.agreed = agreed;
        await auth.user.save();
      } else if (fcm_token) {
        auth.user.fcm_token = fcm_token;
        await auth.user.save();
      } else {
        auth.user.infected = infected;

        if (infected) {
          const { id } = await UserInfection.create({ user_id: auth.user.id });
          auth.user.last_infection_id = id;
          Event.fire("user::updateStatus", auth.user.id);
        }
        await auth.user.save();
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
      const user = auth.user;
      const infections = await user
        .infections()
        .where("long_term_status", null)
        .orderBy("created_at", "asc")
        .fetch();
      user.infection = infections.rows[0];
      return user;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserController;
