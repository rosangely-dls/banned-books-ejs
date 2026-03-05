
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  rating: { type: Number, min: 1, max: 5 },
  review: String,
  bannedReason: String,
}, { timestamps: true});

module.exports = mongoose.model("Book", BookSchema);