const express = require("express");
const multipart = require("connect-multiparty");
const postController = require("../controllers/Post");
const md_auth = require("../middleware/authenticated");

const md_uploads = multipart({ uploadDir: "./uploads/post" });

const api = express.Router();

//con autenticacion
api.post("/post", [md_auth.asureAuth, md_uploads], postController.createPost);
api.patch(
  "/post/:id",
  [md_auth.asureAuth, md_uploads],
  postController.updatePost
);
api.delete("/post/:id", [md_auth.asureAuth], postController.deletePost);
api.post("/posts/:username", [md_auth.asureAuth], postController.getMyPosts);
api.get("/posts/follow", [md_auth.asureAuth], postController.getFollowPost);
//sin autenticacion
api.post("/post/search", postController.searchPost);
api.get("/post/sort_popularity", postController.sortByPopularity);
api.get("/post/:id", postController.getPost);
api.get("/post", postController.getPosts);
//api.get("/post/sort_date", postController.sortByCreationDate);
api.post("/post/:id", [md_auth.asureAuth], postController.likePost);
api.get("/posts/:id", postController.getUserPost);

module.exports = api;
