const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please input a name field"],
    },
    email: {
      type: String,
      required: [true, "Please input an email field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please input a password field"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
