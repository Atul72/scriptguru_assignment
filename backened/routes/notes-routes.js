const express = require("express");
const Note = require("../models/notes-model");
const router = express.Router();
const slugify = require("slugify");

router.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title,
    content,
    // slug: title.toLowerCase().replace(/ /g, "-"),
    slug: slugify(title, { lower: true, strict: true }),
  });
  await note.save();
  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

router.get("/notes/search", async (req, res) => {
  const query = req.query.query || "";

  const regex = new RegExp(query, "i");

  const notes = await Note.find({
    $or: [{ title: regex }, { slug: regex }],
  }).limit(5);

  res.json(notes);
});

router.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.status(200).json({
    message: "Note fetched successfully",
    note,
  });
});

router.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findByIdAndUpdate(id, { title, content });
  res.status(200).json({
    message: "Note updated successfully",
    note,
  });
});

module.exports = router;
