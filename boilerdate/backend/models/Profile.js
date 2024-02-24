const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  gpa: String,
  major: String,
  degree: String,
  interests: [{ type: String }],
  height: String,
  personality: String,
  relationship: String,
  citizenship: String,
  lifestyle: String,
  skills: String,
  employment_history: String,
  career_goals: String,
  github: String,
  linkedin: String,
});

const ProfileModel = mongoose.model("profileInfo", ProfileSchema);
module.exports = ProfileModel;
