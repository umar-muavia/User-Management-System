// models/AddUser.js

const mongoose = require("mongoose");

const AddUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  city: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const AddUserModel = mongoose.model("addUser", AddUserSchema);

module.exports = AddUserModel;
