const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  gpa: String,
  major: String,
  degree: String,
  interests: [{ type: String }],
  lifestyle: [{ type: String }],
  height: String,
  personality: String,
  relationship: String,
  citizenship: String,
  skills: String,
  employment_history: String,
  career_goals: String,
  github: String,
  linkedin: String,
});

const ProfileModel = mongoose.model("profileInfo", ProfileSchema);
module.exports = ProfileModel;
