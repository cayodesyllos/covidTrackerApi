"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NotificationsSchema extends Schema {
  up() {
    this.create("notifications", (table) => {
      table.increments();
      table
        .integer("checkin_id")
        .unsigned()
        .references("id")
        .inTable("checkins")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("location_id")
        .unsigned()
        .references("id")
        .inTable("locations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.boolean("first_one");
      table.timestamps();
    });
  }

  down() {
    this.drop("notifications");
  }
}

module.exports = NotificationsSchema;
