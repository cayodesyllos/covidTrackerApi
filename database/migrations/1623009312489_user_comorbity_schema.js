"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserComorbitySchema extends Schema {
  up() {
    this.create("user_comorbities", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.boolean("cardiovascular").defaultTo(false);
      table.boolean("diabetis").defaultTo(false);
      table.boolean("lung").defaultTo(false);
      table.boolean("cancer").defaultTo(false);
      table.boolean("kidney").defaultTo(false);
      table.boolean("solid_organ").defaultTo(false);
      table.boolean("obesity").defaultTo(false);
      table.boolean("smoking").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("user_comorbities");
  }
}

module.exports = UserComorbitySchema;
