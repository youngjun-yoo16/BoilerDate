const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  name: String,
  email: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const ImageModel = mongoose.model("Profile_Images", imageSchema);
module.exports = ImageModel;
