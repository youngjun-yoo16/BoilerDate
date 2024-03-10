const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  email: String,
  like: Boolean,
  match: Boolean,
});

const NotificationModel = mongoose.model("notifications", NotificationSchema);
module.exports = NotificationModel;
