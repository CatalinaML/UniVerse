const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  id_post: String,
  username: String,
  avatar_user: String,
  comment: String,
  date: Date,
});

module.exports = mongoose.model("Comment", CommentSchema);
