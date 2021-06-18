"use strict";
const UserInfection = use("App/Models/UserInfection");

class UserInfectionController {
  async update({ response, auth, request }) {
    const { severity } = request.only(["severity"]);
    const user = auth.user;

    try {
      const ui = await UserInfection.findByOrFail("id", user.last_infection_id);
      ui.severity = severity;
      ui.save();
      return ui;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserInfectionController;
