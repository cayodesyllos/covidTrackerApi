"use strict";
const UserComorbity = use("App/Models/UserComorbity");

class UserComorbityController {
  async store({ request, response, auth }) {
    const data = request.all();
    data.user_id = auth.user.id;
    try {
      await UserComorbity.create(data);
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
      const uc = await UserComorbity.findByOrFail("user_id", user_id);
      return uc;
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
      const uc = await UserComorbity.findByOrFail("user_id", user_id);
      await uc.merge(data);
      uc.save();
      return uc;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = UserComorbityController;
