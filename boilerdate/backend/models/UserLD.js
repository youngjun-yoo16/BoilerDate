const mongoose = require("mongoose");

const UserLDSchema = new mongoose.Schema({
  email: String,
  liked: {
    emails: [String],
  },
  disliked: {
    emails: [String],
  },
});

const UserLDModel = mongoose.model("userLD", UserLDSchema);
module.exports = UserLDModel;
