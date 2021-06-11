"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class VacineSchema extends Schema {
  up() {
    this.create("user_vacines", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("vacine");
      table.string("date_first_dose");
      table.string("date_second_dose");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_vacines");
  }
}

module.exports = VacineSchema;
