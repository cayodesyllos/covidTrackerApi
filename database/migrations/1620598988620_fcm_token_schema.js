"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FcmTokenSchema extends Schema {
  up() {
    this.table("users", (table) => {
      table.string("fcm_token");
    });
  }

  down() {
    this.table("users", (table) => {
      table.dropColumn("fcm_token");
    });
  }
}

module.exports = FcmTokenSchema;
