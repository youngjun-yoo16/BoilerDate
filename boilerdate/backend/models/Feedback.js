const mongoose = require("mongoose");

const UserFeedbackSchema = new mongoose.Schema({
  email: String,
  feedback: String,
  rating: String,
});

const UserFeedbackModel = mongoose.model(
  "user_feedback_and_rating",
  UserFeedbackSchema
);
module.exports = UserFeedbackModel;
