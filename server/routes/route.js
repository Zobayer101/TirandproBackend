const express = require("express");
const con = require("../database/database");
const controller = require("../controller/controller");
const routes = express.Router();

//Api Create

routes.get("/api/getdata", async (req, res) => {
  con.query("SELECT * FROM userData", (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
//Signup api create

routes.post("/api/insart/signup", controller.Signup);

//Login api create

routes.post("/api/data/login", controller.LoginData);

//MoreInfo come in api
routes.post("/api/moredata/comeuser", controller.MoreDataAdd);

//Profile pic upload api create
routes.post("/api/data/profile/uploder", controller.ProfileUploader);

module.exports = routes;
