const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true,
    lowercase: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Paper", paperSchema);
