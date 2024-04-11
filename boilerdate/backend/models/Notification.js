const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  email: String,
  like: Boolean,
  match: Boolean,
  update: Boolean,
  message: Boolean,
});

const NotificationModel = mongoose.model("notifications", NotificationSchema);
module.exports = NotificationModel;
