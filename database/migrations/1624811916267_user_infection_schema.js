"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserInfectionSchema extends Schema {
  up() {
    this.table("user_infections", (table) => {
      table.string("long_term_status");
    });
  }

  down() {
    this.table("user_infections", (table) => {
      table.dropColumn("long_term_status");
    });
  }
}

module.exports = UserInfectionSchema;
