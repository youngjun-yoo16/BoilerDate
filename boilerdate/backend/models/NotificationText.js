const mongoose = require("mongoose");

const NotificationTextSchema = new mongoose.Schema({
  email: String,
  like: Boolean,
  match: Boolean,
  update: Boolean,
});

const NotificationTextModel = mongoose.model("notificationsText", NotificationTextSchema);
module.exports = NotificationTextModel;
