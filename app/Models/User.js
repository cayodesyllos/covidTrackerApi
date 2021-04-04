"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment-timezone");
const Hash = use("Hash");

class User extends Model {
  static formatDates(field, value) {
    return moment(value).tz("America/Sao_Paulo").format();
  }

  static get hidden() {
    return ["password"];
  }

  checkins() {
    return this.hasMany("App/Models/Checkin");
  }
  locations() {
    return this.hasMany("App/Models/Location");
  }

  static boot() {
    super.boot();
    this.addHook("beforeCreate", async (userInstance) => {
      if (userInstance.dirty.email) {
        userInstance.email = userInstance.email.toLowerCase();
      }
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }
}

module.exports = User;
