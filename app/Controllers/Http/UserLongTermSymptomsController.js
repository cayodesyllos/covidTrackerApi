"use strict";
const UserLongTermSymptom = use("App/Models/UserLongTermSymptom");
const UserInfection = use("App/Models/UserInfection");

class UserLongTermSymptomsController {
  async store({ request, response, auth }) {
    const data = request.all();
    data.user_id = auth.user.id;
    try {
      await UserLongTermSymptom.create(data);
      const infection = await UserInfection.findByOrFail(
        "id",
        data.infection_id
      );
      infection.long_term_status = data.long_term_status;
      await infection.save();
      return;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserLongTermSymptomsController;
