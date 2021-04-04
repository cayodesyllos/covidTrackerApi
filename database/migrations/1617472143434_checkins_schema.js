"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckinsSchema extends Schema {
  up() {
    this.create("checkins", (table) => {
      table.increments();
      table
        .integer("location_id")
        .unsigned()
        .references("id")
        .inTable("locations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("checkins");
  }
}

module.exports = CheckinsSchema;
