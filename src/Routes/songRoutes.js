const express = require("express");
const router = express.Router();
const songController = require("../Controllers/songController");
const {
  authenticateUser,
  authorizeUser,
  authorizeCreator,
} = require("../Middleware/authMiddleware");
router.get("/", songController.getAllSongs);
router.get("/:id", songController.getAllSongById);
router.post("/", songController.createSong);
router.put("/:id", songController.updateSong);
router.delete("/:id", songController.deleteSong);
router.post("/addSong", songController.addSongToPlaylist);
router.post("/deleteSong", songController.removeSongToPlaylist);
module.exports = router;
