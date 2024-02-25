const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const imageModel = mongoose.model("Profile_Images", imageSchema);
module.exports = imageModel;
