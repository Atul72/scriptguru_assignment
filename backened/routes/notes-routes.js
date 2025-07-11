const express = require("express");
const router = express.Router();
const {
  createNote,
  searchNotes,
  getNote,
  updateNote,
} = require("../controller/notes-controller");

router.post("/notes", createNote);
router.get("/notes/search", searchNotes);
router.get("/notes/:id", getNote);
router.put("/notes/:id", updateNote);

module.exports = router;
