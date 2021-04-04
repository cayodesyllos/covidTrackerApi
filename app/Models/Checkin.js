"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment-timezone");
const Hash = use("Hash");

class Checkin extends Model {
  static formatDates(field, value) {
    return moment(value).tz("America/Sao_Paulo").format();
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  location() {
    return this.belongsTo("App/Models/Location");
  }
}

module.exports = Checkin;
