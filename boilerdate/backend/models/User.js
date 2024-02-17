const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel