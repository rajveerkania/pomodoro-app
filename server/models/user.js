const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "List",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
