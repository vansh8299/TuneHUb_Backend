const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  musicdirector: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  albumName: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
