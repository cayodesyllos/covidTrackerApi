"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckinStatusSchema extends Schema {
  up() {
    this.table("checkins", (table) => {
      table.string("flag").defaultTo("green");
    });
  }

  down() {
    this.table("checkins", (table) => {
      table.dropColumn("infected");
      table.dropColumn("flag");
    });
  }
}

module.exports = CheckinStatusSchema;
