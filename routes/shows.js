const express = require("express");
const router = express.Router();
const { User, Show } = require("../models/index.js");

// - `GET` /shows
router.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

// - `GET` /shows/:showId
router.get("/:showId", async (req, res) => {
  const show = await Show.findByPk(req.params.showId);
  if (!show) {
    res.status(404).json({ error: "Show does not exist" });
    return;
  }
  res.json(show);
});
// - `GET` /shows/:showId/users
router.get("/:showIs/users", async (req, res) => {
  const show = await Show.findByPk(req.params.showIs);
  if (!show) {
    res.json([]);
    return;
  }
  const users = await show.getUsers();
  res.json(users);
});
// - `PATCH` /shows/:showId
// - `DELETE` /shows/:showId
router.delete("/:showId", async (req, res) => {
  const show = await Show.findByPk(req.params.showId);
  if (!show) {
    res.status(404).json({ error: "Show not found" });
    return;
  }
  await show.destroy();
  res.status(204);
});
// - `GET` shows of a particular genre (genre in `req.query`)

module.exports = router;
