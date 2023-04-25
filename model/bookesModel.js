const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  bestselling: {
    type: Boolean,
    default: false,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
  recommended: {
    type: Boolean,
    default: false,
  },
});
const BOOKES = mongoose.model("bookes", bookesSchema);
module.exports = BOOKES;

// sign up
// login
// logout

// create a book(admin)
// get all books
// *work on bookmarks
// *
