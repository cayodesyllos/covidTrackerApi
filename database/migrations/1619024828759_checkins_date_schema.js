"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckinsDateSchema extends Schema {
  up() {
    this.table("checkins", (table) => {
      table.date("date");
    });
  }

  down() {
    this.table("checkins", (table) => {
      table.dropColumn("date");
    });
  }
}

module.exports = CheckinsDateSchema;
