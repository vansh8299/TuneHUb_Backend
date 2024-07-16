const Playlist = require("../Model/Playlist");

exports.getAllPlaylist = async () => {
  try {
    return await Playlist.find();
  } catch (error) {
    throw new Error("Failed to fetch the playlists");
  }
};

exports.getAllPlaylistById = async (id) => {
  try {
    const playlist = await Playlist.findById(id).populate("songs");
    if (!playlist) {
      throw new Error("Playlist not found");
    }
    return playlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createPlaylist = async (newFields, id) => {
  newFields.user = id;
  const newPlaylist = new Playlist(newFields);
  return await newPlaylist.save();
};

exports.updatePlaylist = async (id, updatedFields) => {
  return await Playlist.findByIdAndUpdate(id, updatedFields, { new: true });
};

exports.deletePlaylist = async (id) => {
  return await Playlist.findByIdAndDelete(id);
};
