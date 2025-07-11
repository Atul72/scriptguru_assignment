const express = require("express");
const notesRoutes = require("./routes/notes-routes");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

app.use(express.json());

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/api/v1", notesRoutes);

const activeUsers = {};

io.on("connection", (socket) => {
  let joinedNoteId = null;

  socket.on("join_note", (noteId) => {
    socket.join(noteId);
    joinedNoteId = noteId;

    if (!activeUsers[noteId]) activeUsers[noteId] = new Set();
    activeUsers[noteId].add(socket.id);

    io.to(noteId).emit("active_users", Array.from(activeUsers[noteId]));

    socket.on("note_update", ({ noteId, content }) => {
      socket.to(noteId).emit("note_update", { content });
    });
  });
  socket.on("disconnect", () => {
    if (joinedNoteId && activeUsers[joinedNoteId]) {
      activeUsers[joinedNoteId].delete(socket.id);
      io.to(joinedNoteId).emit(
        "active_users",
        Array.from(activeUsers[joinedNoteId])
      );
    }
  });
});

module.exports = server;
