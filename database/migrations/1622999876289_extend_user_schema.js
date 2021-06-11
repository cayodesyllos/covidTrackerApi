"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ExtendUserSchema extends Schema {
  up() {
    this.table("users", (table) => {
      table.string("sex");
      table.string("birthday");
      table.string("agreed");
    });
  }

  down() {
    this.table("users", (table) => {
      table.dropColumn("sex");
      table.dropColumn("birthday");
      table.dropColumn("agreed");
    });
  }
}

module.exports = ExtendUserSchema;
