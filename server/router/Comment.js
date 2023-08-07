const express = require("express");
const commentController = require("../controllers/Comment");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post(
  "/comment/:id_post",
  [md_auth.asureAuth],
  commentController.createComment
);

api.get("/comment/:id_post", commentController.getCommentsByPost);
api.delete(
  "/comment/:id_post/:id_comment",
  [md_auth.asureAuth],
  commentController.deleteComment
);

module.exports = api;
