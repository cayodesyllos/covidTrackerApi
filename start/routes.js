"use strict";

const Route = use("Route");

Route.post("/user", "UserController.store");
Route.post("/login", "SessionController.authenticate");

Route.group(() => {}).middleware(["auth"]);
