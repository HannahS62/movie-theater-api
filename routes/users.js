const express = require("express");
const router = express.Router();
const { User, Show } = require("../models/index.js");

// - `GET` /users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// - `GET` /users/:userId
router.get("/:userId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});
// - `GET` /users/:userId/shows
router.get("/:userId/shows", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    res.json([]);
    return;
  }
  const shows = await user.getShows();
  res.json(shows);
});

// - `PUT` /users/:userId/shows/showsID
router.put("/:userId/shows/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    res.status(400).json({
      error: "Cannot associate a show with a user that does not exist",
    });
    return;
  }
  const show = await Show.findByPk(req.params.showId);
  if (!show) {
    res.status(400).json({
      error: "Cannot associate a user with a show that does not exist",
    });
    return;
  }
  await user.addShow(show);
  res.status(204).send();
});
module.exports = router;
