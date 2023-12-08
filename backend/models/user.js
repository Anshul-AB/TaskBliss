const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    list:[{
        type: mongoose.Types.ObjectId,
        ref:"List"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)
