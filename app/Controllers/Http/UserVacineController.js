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
  async index({ response, auth }) {
    const user_id = auth.user.id;
    try {
      const uv = await UserVacine.findByOrFail("user_id", user_id);
      return uv;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }

  async update({ response, auth, request }) {
    const data = request.all();
    const user_id = auth.user.id;
    try {
      const uv = await UserVacine.findByOrFail("user_id", user_id);
      await uv.merge(data);
      uv.save();
      return uv;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserVacineController;
