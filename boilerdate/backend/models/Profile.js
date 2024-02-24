const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  height: { type: Number, min: 1, max: 10 },
  gpa: { type: Number, min: 0, max: 4 },
  major: { type: String, enum: ["CS", "MA", "Eng"] },
  interests: [{ type: String }],
  hobbies: String,
  personality: String,
  degree: String,
  citizenship: String,
  lifestyle: String,
  relationship_goals: String,
  skills: String,
  employment_history: String,
  career_goals: String,
  github: String,
  linkedin: String,
});

const ProfileModel = mongoose.model("profileInfo", ProfileSchema);
module.exports = ProfileModel;
