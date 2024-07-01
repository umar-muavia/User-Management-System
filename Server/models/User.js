const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "visitor"
  }
});

const UserModel = mongoose.model("user-Registrations", UserSchema);
module.exports = UserModel;
