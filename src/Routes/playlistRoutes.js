const express = require("express");
const router = express.Router();
const playlistController = require("../Controllers/playlistController");
const {
  authenticateUser,
  authorizeUser,
  authorizeCreator,
  authorizePlaylist,
} = require("../Middleware/authMiddleware");

router.get(
  "/",
  authenticateUser,
  authorizeUser("user"),
  playlistController.getAllPlaylist
);

router.get(
  "/:id",
  authenticateUser,
  authorizeUser("user"),
  playlistController.getAllPlaylistById
);

router.post(
  "/",
  authenticateUser,
  authorizeUser("user"),
  playlistController.createPlaylist
);

router.put(
  "/:id",
  authenticateUser,
  authorizeUser("user"),
  playlistController.updatePlaylist
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeUser("user"),
  playlistController.deletePlaylist
);

module.exports = router;
