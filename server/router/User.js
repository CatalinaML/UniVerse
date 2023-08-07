const express = require("express");
const multipar = require("connect-multiparty");
const userController = require("../controllers/User");
const md_upload = multipar({ uploadDir: "./uploads/avatar" });
const md_auth = require("../middleware/authenticated");

const api = express.Router();

//necesitan que haya una sesion iniciada
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  userController.updateUser
);
api.get("/user/me", [md_auth.asureAuth], userController.getMe);
api.delete("/user/:id", [md_auth.asureAuth], userController.deleteUser);

//FOLLOW / UNFOLLOW
api.post("/user/:id", [md_auth.asureAuth], userController.followUnfollow);

api.get("/user/:id", userController.getUser);

api.get("/user/:id/:type", userController.getFollowFollower);
module.exports = api;
