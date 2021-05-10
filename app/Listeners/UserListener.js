const UserListener = (exports = module.exports = {});
const Checkin = use("App/Models/Checkin");
const User = use("App/Models/User");
const Location = use("App/Models/Location");
const Notification = use("App/Models/Notification");
const { admin } = require("../../config/firebase");
const moment = require("moment-timezone");

UserListener.updateStatus = async (id) => {
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
        setTimeout(async () => {
          console.log("!!!");
          await notify(
            checkin.user_id,
            checkin.id,
            checkin.location_id,
            checkin.flag
          );
          checkin.flag = "red";
          await checkin.save();
        }, 20000);
      }
    })
  );
};

const notify = async (user_id, checkin_id, location_id, flag) => {
  const first_one = flag === "green";

  const user = await User.findBy("id", user_id);
  const location = await Location.findBy("id", location_id);

  await admin.messaging().send({
    token: user.fcm_token,
    notification: {
      title: `It is a red flag!`,
      body: `Someone that you crossed paths with at ${location.name} has updated his status to infected`,
    },
  });

  await Notification.create({ user_id, checkin_id, location_id, first_one });
};
