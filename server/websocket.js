import { Server } from "socket.io";
import Session from "./models/Session.js";

export default function registerWebSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  const roomUsers = {};

  io.on("connection", (socket) => {
    console.log(`🔌 Connected: ${socket.id}`);

    socket.on("joinRoom", async ({ roomId, username }) => {
      socket.join(roomId);
      if (!roomUsers[roomId]) roomUsers[roomId] = new Set();
      roomUsers[roomId].add(username);

      const session = await Session.findOne({ roomId });
      const content = session ? session.content : "";

      socket.emit("loadCode", content);
      io.to(roomId).emit("userList", [...roomUsers[roomId]]);
    });

    socket.on("codeChange", async ({ roomId, code }) => {
      await Session.findOneAndUpdate(
        { roomId },
        { content: code },
        { upsert: true }
      );
      socket.to(roomId).emit("codeUpdate", code);
    });

    socket.on("chatMessage", ({ roomId, user, message }) => {
      io.to(roomId).emit("newMessage", { user, message });
    });

    socket.on("disconnecting", () => {
      for (const roomId of socket.rooms) {
        if (roomUsers[roomId]) {
          roomUsers[roomId].delete(socket.id);
          io.to(roomId).emit("userList", [...roomUsers[roomId]]);
        }
      }
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
}
