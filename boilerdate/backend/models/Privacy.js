const mongoose = require("mongoose");

const PrivacySchema = new mongoose.Schema({
  email: String,
  gpa: String,
  major: String,
  degree: String,
  interests: String,
  lifestyle: String,
  height: String,
  personality: String,
  relationship: String,
  citizenship: String,
  skills: String,
  employment: String,
  career: String,
  github: String,
  linkedin: String,
});

const PrivacyModel = mongoose.model("privacy", PrivacySchema);
module.exports = PrivacyModel;
