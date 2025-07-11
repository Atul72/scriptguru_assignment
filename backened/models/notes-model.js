const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
  slug: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
