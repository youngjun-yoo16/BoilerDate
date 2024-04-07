const mongoose = require("mongoose");

const PremiumStatusSchema = new mongoose.Schema({
  email: String,
  premium_condition: Boolean,
  premium_status: Boolean,
});

const PremiumStatusModel = mongoose.model(
  "user_premium_status",
  PremiumStatusSchema
);

module.exports = PremiumStatusModel;
/*
const mongoose = require("mongoose");

const PremiumStatusSchema = new mongoose.Schema({
  email: String,
  swipes: String,
  premium_condition: Boolean,
  premium_status: Boolean,
});

const PremiumStatusModel = mongoose.model(
  "user_premium_status",
  PremiumStatusSchema
);

module.exports = PremiumStatusModel;
*/