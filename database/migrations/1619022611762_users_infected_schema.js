"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersInfectedSchema extends Schema {
  up() {
    this.table("users", (table) => {
      table.boolean("infected").defaultTo(false);
    });
  }

  down() {
    this.table("users", (table) => {
      table.dropColumn("infected");
    });
  }
}

module.exports = UsersInfectedSchema;
