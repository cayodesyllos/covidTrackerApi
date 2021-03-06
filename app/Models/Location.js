"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment-timezone");
const Hash = use("Hash");

class Location extends Model {
  static formatDates(field, value) {
    return moment(value).tz("America/Sao_Paulo").format();
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  ckeckins() {
    return this.hasMany("App/Models/Checkin");
  }
}

module.exports = Location;
