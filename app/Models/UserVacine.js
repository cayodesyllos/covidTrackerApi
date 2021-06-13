"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment-timezone");

class UserVacine extends Model {
  static formatDates(field, value) {
    return moment(value).tz("America/Sao_Paulo").format();
  }

  static get hidden() {
    return ["id", "created_at", "updated_at", "user_id"];
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = UserVacine;
