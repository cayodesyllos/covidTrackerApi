"use strict";
const Location = use("App/Models/Location");
const Checkin = use("App/Models/Checkin");
const Database = use("Database");

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

  async index({ response, auth }) {
    try {
      const checkins = await Database.select(
        "checkins.flag",
        "checkins.created_at",
        "locations.name"
      )
        .from("checkins")
        .innerJoin("locations", function () {
          this.on("checkins.location_id", "locations.id");
        })
        .orderBy("checkins.created_at", "desc");

      return checkins;
    } catch (error) {
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = CheckinController;
