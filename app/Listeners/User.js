const User = (exports = module.exports = {});
const Checkin = use("App/Models/Checkin");
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
      if (checkin.user_id != id) checkin.flag = "red";
      await checkin.save();
    })
  );
};
