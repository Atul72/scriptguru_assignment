import { io } from "socket.io-client";
import { BACKEND_URL } from "./backened-url";

const socket = io(BACKEND_URL, {
  transports: ["websocket"],
});

export default socket;
