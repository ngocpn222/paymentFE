// src/socket.js
import { io } from "socket.io-client";

// Kết nối tới backend
const socket = io("http://localhost:5000"); // thay đổi nếu backend khác port/host

export default socket;
