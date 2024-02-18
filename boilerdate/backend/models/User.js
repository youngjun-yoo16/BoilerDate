const mongoose = require("mongoose");
const { isValidPassword } = require("mongoose-custom-validators");

const UserSchema = new mongoose.Schema({
  email: String,
  password: {
    type: String,
    validate: {
      validator: isValidPassword,
      message:
        "Password must have at least 10 characters, 1 uppercase letter, 1 number, and 1 special character.",
    },
  },
  firstName: String,
  lastName: String,
  gender: String,
  dob: Date,
});

const UserModel = mongoose.model("profile", UserSchema);
module.exports = UserModel;
