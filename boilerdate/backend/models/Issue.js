const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  email: String,
  issue: String,
});

const IssueModel = mongoose.model("issue", IssueSchema);
module.exports = IssueModel;
