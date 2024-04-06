const mongoose = require("mongoose");

const PremiumStatusSchema = new mongoose.Schema({
  email: String,
  swipes: String,
  premium: Boolean,
});

const PremiumStatusModel = mongoose.model(
  "user_premium_status",
  PremiumStatusSchema
);

module.exports = PremiumStatusModel;
