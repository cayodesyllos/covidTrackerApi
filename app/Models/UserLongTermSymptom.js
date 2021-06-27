"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment-timezone");

class UserLongTermSymptom extends Model {
  static get hidden() {
    return ["id", "created_at", "updated_at", "user_id"];
  }

  static formatDates(field, value) {
    return moment(value).tz("America/Sao_Paulo").format();
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = UserLongTermSymptom;
