"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LocationsSchema extends Schema {
  up() {
    this.create("locations", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 254).notNullable().unique();
      table.string("token", 60).notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("locations");
  }
}

module.exports = LocationsSchema;
