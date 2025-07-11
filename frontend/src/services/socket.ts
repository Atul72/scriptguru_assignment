import { io } from "socket.io-client";

const socket = io("https://scriptguru-assignment-1.onrender.com", {
  transports: ["websocket"],
});

export default socket;
