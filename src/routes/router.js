const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const auth = require("../middleware/auth");


route.get("/", services.homeRoute);
route.get("/login", services.alreadylogin);
route.get("/secret", auth, services.secret);

route.post("/sign_page", controller.signup);
route.post("/login", controller.login);
route.post("/logout", auth, controller.logout);



module.exports = route;
