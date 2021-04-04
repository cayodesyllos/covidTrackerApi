"use strict";
const Location = use("App/Models/Location");
const Checkin = use("App/Models/Checkin");
const crypto = require("crypto");

class CheckinController {
  async store({ request, response, auth }) {
    const token = request.input("token");
    try {
      const location = await Location.findByOrFail("token", token);

      const location_id = location.id;
      const user_id = auth.user.id;
      const checkin = await Checkin.create({ location_id, user_id });
      checkin.location_name = location.name;
      return checkin;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = CheckinController;
