"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckinStatusSchema extends Schema {
  up() {
    this.table("checkins", (table) => {
      table.boolean("infected").defaultTo(false);
      table.string("flag").defaultTo("green");
    });
  }

  down() {
    this.table("checkin_statuses", (table) => {
      table.drop("infected");
      table.drop("flag");
    });
  }
}

module.exports = CheckinStatusSchema;
