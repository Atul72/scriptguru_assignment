const express = require("express");
const Note = require("../models/notes-model");
const router = express.Router();

router.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.status(201).json({
    message: "Note created successfully",
    note,
  });
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
