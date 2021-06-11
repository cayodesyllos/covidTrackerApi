"use strict";

const Route = use("Route");

Route.post("/user", "UserController.store");
Route.post("/login", "SessionController.authenticate");

Route.group(() => {
  Route.get("/locations", "LocationController.index");
  Route.get("/notifications", "NotificationController.index");
  Route.post("/location", "LocationController.store");
  Route.post("/checkin", "CheckinController.store");
  Route.get("/checkins", "CheckinController.index");
  Route.put("/user", "UserController.update");
  Route.get("/user", "UserController.index");
  Route.post("/vacine", "UserVacineController.store");
  Route.post("/comorbity", "UserComorbityController.store");
}).middleware(["auth"]);
