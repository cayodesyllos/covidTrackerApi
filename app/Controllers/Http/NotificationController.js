"use strict";
const Database = use("Database");

class NotificationController {
  async index({ response, auth }) {
    try {
      const notifications = await Database.select(
        "notifications.updated_at",
        "checkins.created_at",
        "locations.name",
        "notifications.first_one"
      )
        .from("notifications")
        .innerJoin("checkins", function () {
          this.on("notifications.checkin_id", "checkins.id");
        })
        .innerJoin("locations", function () {
          this.on("notifications.location_id", "locations.id");
        })
        .where("notifications.user_id", auth.user.id)
        .orderBy("notifications.created_at", "desc");

      return notifications;
    } catch (error) {
      console.log(error.message);
      return response.status(400).send({
        error: { message: error.message },
      });
    }
  }
}

module.exports = NotificationController;
