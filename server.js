const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log("Failed to connect to MOngoDb", error);
  });

const songRoutes = require("./src/Routes/songRoutes");

const playlistRoutes = require("./src/Routes/playlistRoutes");
const { authenticateUser } = require("./src/Middleware/authMiddleware");
const authRoutes = require("./src/Routes/authRoutes");
app.use("/song", authenticateUser, songRoutes);
app.use("/playlist", authenticateUser, playlistRoutes);
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});
