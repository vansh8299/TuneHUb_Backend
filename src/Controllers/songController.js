const songService = require("../Services/songServices");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch songs" });
  }
};

exports.getAllSongById = async (req, res) => {
  try {
    const song = await songService.getAllSongById(req.params.id);
    if (!song) {
      res.status(404).json({ message: "song not found " });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch song" });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await songService.deleteSong(req.params.id);

    res.json({ message: "Song deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await songService.updateSong(req.params.id, req.body);
    if (!song) {
      res.status(404).json({ message: "song not found " });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSong = async (req, res) => {
  try {
    const song = await songService.createSong(req.body);
    if (!song) {
      res.status(404).json({ message: "song not found " });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: "Failed to create song" });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await songService.addSongToPlaylist(playlistId, songId);
    if (!playlist) {
      res.status(404).json({ message: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to add song to playlist" });
  }
};

exports.removeSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await songService.removeSongToPlaylist(playlistId, songId);
    if (!playlist) {
      res.status(404).json({ message: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to add song to playlist" });
  }
};
