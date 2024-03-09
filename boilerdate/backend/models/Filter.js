const mongoose = require("mongoose");

const FilterSchema = new mongoose.Schema({
  email: String,
  filter_preferences: {
    gpa: String,
    age: [String],
    major: String,
    degree: String,
    interests: [String],
    lifestyle: [String],
    height: [Number],
    personality: String,
    relationship: String,
    citizenship: String,
  },
});

const FilterModel = mongoose.model("filter_preferences", FilterSchema);
module.exports = FilterModel;
