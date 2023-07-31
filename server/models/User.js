const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: String,
  followers: [String],
  follow: [String],
});

module.exports = mongoose.model("User", UserShema);
