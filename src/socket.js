// socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  query: {
    userId: currentUser._id,
    role: currentUser.role, // "Student" hoặc "Admin"
  },
  transports: ["websocket"],
});

export default socket;
