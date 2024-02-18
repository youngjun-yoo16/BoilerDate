const mongoose = require("mongoose");
//const { isValidPassword } = require('mongoose-custom-validators')

const CodeSchema = new mongoose.Schema({
  email: String,
  verificationCode: String
});

const CodeModel = mongoose.model("verifications", CodeSchema);
module.exports = CodeModel;