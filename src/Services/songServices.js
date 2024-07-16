const Song = require("../Model/Song");

const Playlist = require("../Model/Playlist");

exports.getAllSongs = async () => {
  try {
    let query = { visibility: true };
    return await Song.find(query);
  } catch (error) {
    throw new Error("Failed to fetch the application");
  }
};

exports.getAllSongById = async (id) => {
  try {
    const song = await Song.findById(id);

    if (!song) {
      throw new Error("Song not found");
    }

    return song;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createSong = async (newFields) => {
  const newSong = new Song(newFields);
  return await newSong.save();
};

exports.updateSong = async (id, updatedFields) => {
  const song = await Song.findById(id);

  if (song.visibility == true && updatedFields.visibility == false) {
    await Playlist.updateMany({ songs: id }, { $pull: { songs: id } });
  }
  return await Song.findByIdAndUpdate(id, updatedFields, { new: true });
};

exports.deleteSong = async (id) => {
  await Playlist.updateMany({ songs: id }, { $pull: { songs: id } });
  return await Song.findByIdAndDelete(id);
};

exports.addSongToPlaylist = async (playlistId, songId) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $addToSet: { songs: songId } },
      { new: true }
    );
    if (!playlist) {
      throw new Error("Playlist not found");
    }
    return playlist;
  } catch (error) {
    throw new Error(`Could not add song to playlist: ${error.message}`);
  }
};

exports.removeSongToPlaylist = async (playlistId, songId) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $pull: { songs: songId } },
      { new: true }
    );
    if (!playlist) {
      throw new Error("Playlist not found");
    }
    return playlist;
  } catch (error) {
    throw new Error(`Could not delete song to playlist: ${error.message}`);
  }
};
