const mongoose = require("mongoose");

const pagination = require("mongoose-paginate");

const PostSchema = mongoose.Schema({
  title: String,
  content: String,
  create_date: Date,
  miniature: String,
  author: String,
  id_author: String,
  avatar_author: String,
  likes: [String],
  likeCount: Number,
});

PostSchema.plugin(pagination);

module.exports = mongoose.model("Post", PostSchema);
