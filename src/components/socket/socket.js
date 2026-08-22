import { io } from "socket.io-client";


let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io("https://sandbox.agamiastro.in", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket Connected");

      socket.emit("supportJoin", { token });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
    });
  }

  return socket;
};

export const getSocket = () => socket;
