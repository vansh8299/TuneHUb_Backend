const playlistService = require("../Services/playlistService");

exports.getAllPlaylist = async (req, res) => {
  try {
    const playlists = await playlistService.getAllPlaylist();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch playlist" });
  }
};

exports.getAllPlaylistById = async (req, res) => {
  try {
    const playlist = await playlistService.getAllPlaylistById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Check if there's a query parameter for song name search
    const { Name } = req.query;
    if (Name) {
      // Search for songs by name within the playlist
      const matchedSongs = playlist.songs.filter((song) => {
        return song.Name.toLowerCase().includes(Name.toLowerCase());
      });
      return res.json(matchedSongs);
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch playlist" });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    await playlistService.deletePlaylist(req.params.id);
    res.json({ message: "Playlist deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.updatePlaylist(
      req.params.id,
      req.body
    );
    if (!playlist) {
      res.status(404).json({ message: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.createPlaylist(
      req.body,
      req.user._id
    );
    if (!playlist) {
      res.status(404).json({ message: "Failed to create playlist" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to create playlist" });
  }
};
