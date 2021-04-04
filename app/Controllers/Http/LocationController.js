"use strict";
const Location = use("App/Models/Location");
const User = use("App/Models/User");
const crypto = require("crypto");

class LocationController {
  async store({ request, response, auth }) {
    const name = request.input("name");
    try {
      const token = crypto.randomBytes(10).toString("hex");
      const user_id = auth.user.id;
      const location = await Location.create({ name, token, user_id });

      return location;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }

  async index({ response, auth }) {
    try {
      const locations = await auth.user
        .locations()
        .orderBy("created_at", "desc")
        .fetch();

      return locations;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = LocationController;
