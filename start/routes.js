"use strict";

const Route = use("Route");

Route.post("/user", "UserController.store");
Route.post("/login", "SessionController.authenticate");

Route.group(() => {
  Route.get("/locations", "LocationController.index");
  Route.post("/location", "LocationController.store");
  Route.post("/checkin", "CheckinController.store");
  Route.get("/checkins", "CheckinController.index");
}).middleware(["auth"]);
