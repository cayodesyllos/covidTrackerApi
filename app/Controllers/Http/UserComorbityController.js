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
}

module.exports = UserComorbityController;
