"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserLongTermSymptomSchema extends Schema {
  up() {
    this.create("user_long_term_symptoms", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("infection_id")
        .unsigned()
        .references("id")
        .inTable("user_infections")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.boolean("fatigue").defaultTo(false);
      table.boolean("dyspnea").defaultTo(false);
      table.boolean("chest_discomfort").defaultTo(false);
      table.boolean("cough").defaultTo(false);
      table.boolean("anosmia").defaultTo(false);
      table.boolean("other_physics").defaultTo(false);
      table.boolean("post_traumatic").defaultTo(false);
      table.boolean("impaired_memory").defaultTo(false);
      table.boolean("poor_concentration").defaultTo(false);
      table.boolean("anxiety_depression").defaultTo(false);
      table.boolean("other_neuro").defaultTo(false);
      table.string("long_term_status");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_long_term_symptoms");
  }
}

module.exports = UserLongTermSymptomSchema;
