const User = (exports = module.exports = {});
const Checkin = use("App/Models/Checkin");
const Notification = use("App/Models/Notification");
const moment = require("moment-timezone");

User.updateStatus = async (id) => {
  try {
    const begin = moment().subtract(2, "days").startOf("day");
    const checkins = await Checkin.query()
      .where("user_id", id)
      .where("created_at", ">=", begin)
      .fetch();
    await Promise.all(
      checkins.rows.map(async (checkin) => {
        const checkins_ = await Checkin.query()
          .where("date", checkin.date)
          .where("location_id", checkin.location_id)
          .fetch();
        updateCheckins(checkins_, id);
      })
    );
  } catch (error) {}
};

const updateCheckins = async (checkins, id) => {
  await Promise.all(
    checkins.rows.map(async (checkin) => {
      if (checkin.user_id != id) {
        await notify(
          checkin.user_id,
          checkin.id,
          checkin.location_id,
          checkin.flag
        );
        checkin.flag = "red";
        await checkin.save();
      }
    })
  );
};

const notify = async (user_id, checkin_id, location_id, flag) => {
  const first_one = flag === "green";
  await Notification.create({ user_id, checkin_id, location_id, first_one });
};
