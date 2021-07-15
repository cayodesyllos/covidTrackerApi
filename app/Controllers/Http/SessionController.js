"use strict";
const User = use("App/Models/User");
class SessionController {
  async authenticate({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      const token = await auth.attempt(email, password);

      const user = await User.findByOrFail("email", email);
      token.agreed = user.agreed;
      return token;
    } catch (error) {
      return await response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = SessionController;
