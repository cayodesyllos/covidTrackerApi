"use strict";
const Location = use("App/Models/Location");
const Checkin = use("App/Models/Checkin");
const Database = use("Database");

class CheckinController {
  async store({ request, response, auth }) {
    try {
      if (auth.user.infected) {
        throw new Error(
          "You cannot check-in, because you have an infected status"
        );
      }

      const date = new Date().toISOString().split("T")[0];
      const duplicateCheckIn = await auth.user
        .checkins()
        .where("date", date)
        .getCount();

      if (parseInt(duplicateCheckIn) !== 0) {
        throw new Error("You have already checkin here today");
      }

      const token = request.input("token");
      const location = await Location.findByOrFail("token", token);

      const location_id = location.id;
      const user_id = auth.user.id;

      const checkin = await Checkin.create({ location_id, user_id, date });
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
        .where("checkins.user_id", auth.user.id)
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
