"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserInfectionSchema extends Schema {
  up() {
    this.create("user_infections", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("severity");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_infections");
  }
}

module.exports = UserInfectionSchema;
