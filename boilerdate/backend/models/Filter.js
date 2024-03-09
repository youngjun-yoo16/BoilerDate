const mongoose = require("mongoose");

const FilterSchema = new mongoose.Schema({
  email: String,
  gpa: String,
  age: Number,
  major: String,
  degree: String,
  interests: [{ type: String }],
  lifestyle: [{ type: String }],
  height: String,
  personality: String,
  relationship: String,
  citizenship: String,
});

const FilterModel = mongoose.model("filter_preferences", FilterSchema);
module.exports = FilterModel;
