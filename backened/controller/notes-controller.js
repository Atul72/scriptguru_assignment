const Note = require("../models/notes-model");
const slugify = require("slugify");

exports.createNote = async (req, res) => {
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
};

exports.searchNotes = async (req, res) => {
  const query = req.query.query || "";

  const regex = new RegExp(query, "i");

  const notes = await Note.find({
    $or: [{ title: regex }, { slug: regex }],
  }).limit(5);

  res.json(notes);
};

exports.getNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.status(200).json({
    message: "Note fetched successfully",
    note,
  });
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findByIdAndUpdate(id, { title, content });
  res.status(200).json({
    message: "Note updated successfully",
    note,
  });
};
