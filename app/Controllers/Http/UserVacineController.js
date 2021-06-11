"use strict";
const UserVacine = use("App/Models/UserVacine");

class UserVacineController {
  async store({ request, response, auth }) {
    const data = request.all();
    data.user_id = auth.user.id;
    try {
      await UserVacine.create(data);
      return;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserVacineController;
