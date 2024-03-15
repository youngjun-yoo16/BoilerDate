const mongoose = require("mongoose");

const UserLDMSchema = new mongoose.Schema({
  email: String,
  liked: {
    emails: [String],
  },
  disliked: {
    emails: [String],
  },
  matches: {
    emails: [String],
  },
  receivedlikes: {
    emails: [String],
  },
});

const UserLDMModel = mongoose.model("user_like_dislike_matches", UserLDMSchema);
module.exports = UserLDMModel;
