const mongoose = require("mongoose");

const PhoneNumberSchema = new mongoose.Schema({
  email: String,
  number: String,
});

const PhoneNumberModel = mongoose.model(
  "user_phone_number",
  PhoneNumberSchema
);

module.exports = PhoneNumberModel;
