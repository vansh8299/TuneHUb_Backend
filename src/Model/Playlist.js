const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
