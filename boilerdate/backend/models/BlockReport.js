const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
  email: String,
  blocks: {
    emails: [String],
  },
  reports: {
    emails: [String],
  },
});

const BlockModel = mongoose.model("block", BlockSchema);
module.exports = BlockModel;
