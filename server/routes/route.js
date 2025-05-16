const express = require("express");
const con = require("../database/database");
const controller = require("../controller/controller");
const TokenChack = require("../middleware/webtoken");
const upload = require("../middleware/Multer");
const LogicalControll = require("../controller/Logicalcontroll");
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
routes.post(
  "/api/moredata/comeuser",
  TokenChack.VarifieadToken,
  controller.MoreDataAdd
);

//Profile pic upload api create
routes.post(
  "/api/data/profile/uploder",

  upload.single("file"),
  TokenChack.VarifieadToken,
  controller.ProfileUploader
);

routes.post(
  "/api/user/comewith/new",
  TokenChack.VarifieadToken,
  LogicalControll.FromGaccount
);

//News feed data
routes.get(
  "/api/user/infinitidata/retrive",
  TokenChack.VarifieadToken,
  LogicalControll.UserRitrive
);
//for google 0Auth
routes.post("/api/auth/callback/google", (req, res) => {
  console.log(req.body);
  console.log("ok");
  res.status(200).json("ok");
});

//myProfile data
routes.get(
  "/api/profile/data/user",
  TokenChack.VarifieadToken,
  controller.Myprofiledata
);
//Aboute me data update api
routes.post(
  "/api/update/userdata/aboutme",
  TokenChack.VarifieadToken,
  controller.UpdateAboutMe
);

//api Interast data update
routes.post(
  "/api/update/itemdata/user/myprofile",
  TokenChack.VarifieadToken,
  controller.MyprofileInterestDataUpdate
);

//api Iam Looking for data update now
routes.post(
  "/api/lookingfor/user/dataupdate",
  TokenChack.VarifieadToken,
  controller.LookingForDataUpdate
);

module.exports = routes;
