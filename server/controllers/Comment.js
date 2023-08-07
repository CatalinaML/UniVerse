const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

async function createComment(req, res) {
  const { id_post } = req.params;
  const { user_id } = req.user;
  const { comment } = req.body;
  const today = new Date();

  const user = await User.findById(user_id);

  const commentO = new Comment({
    id_post: id_post,
    username: user.username,
    avatar_user: user.avatar,
    comment: comment,
    date: today,
  });

  try {
    await commentO.save();
    const post = await Post.findById(id_post);

    post.comments.push(commentO._id);
    await post.save();
    res.status(200).send({ msg: "Comentario creado con exito" });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function deleteComment(req, res) {
  const { id_post, id_comment } = req.params;

  try {
    await Comment.findByIdAndDelete(id_comment);

    await Post.updateOne({ _id: id_post }, { $pull: { comments: id_comment } });

    res.status(200).send({ msg: "Comentario eliminado" });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function getCommentsByPost(req, res) {
  const { id_post } = req.params;

  const post = await Post.findById(id_post);

  try {
    let comments = [];
    for (let index = 0; index < post.comments.length; index++) {
      const comment = await Comment.findById(post.comments[index]);
      comments.push(comment);
    }

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = {
  createComment,
  getCommentsByPost,
  deleteComment,
};
