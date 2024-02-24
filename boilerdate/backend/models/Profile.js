const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  height: { type: Number, min: 1, max: 10 },
  gpa: String,
  major: String,
  degree: String,
  //interests: [{ type: String }],
  //hobbies: String,
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
