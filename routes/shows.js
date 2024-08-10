const express = require("express");
const router = express.Router();
const { User, Show } = require("../models/index.js");
const { check, validationResult } = require("express-validator");

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

//CREATE SHOW CHECK TITLE NO LONGER THAN 25
router.post(
  "/",
  [check("title").isLength({ min: 0, max: 25 }).trim()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      const show = await Show.create({
        title: req.body.title,
        genre: req.body.genre,
        available: req.body.available,
        rating: req.body.rating,
      });
      res.status(201).json(show);
    }
  }
);

module.exports = router;
