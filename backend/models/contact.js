const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      path: 'name',
    },
    email: {
      type: String,
      required: true,
      path: 'email',
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      path: 'phone',
    },
    message: {
      type: String,
      required: true,
      path: 'message',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
