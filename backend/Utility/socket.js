import { Server } from "socket.io";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      socket.disconnect(true);
    }
    try {
      const payload = await jwt.verify(token, process.env.AT_SECRET);
      console.log(payload);
      socket.join(payload?.id);
    } catch (e) {
      console.log(e);
      socket.disconnect(true);
    }
  });
}

export function getIo() {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
}
