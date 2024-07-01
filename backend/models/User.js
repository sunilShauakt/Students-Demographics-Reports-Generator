// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: function () {
      return this.role === "USER" ? "pending" : undefined;
    },
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
