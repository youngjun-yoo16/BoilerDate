const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
  email: String,
  blocks: {
    emails: [String],
  },
});

const BlockModel = mongoose.model("block", BlockSchema);
module.exports = BlockModel;
