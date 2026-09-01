// import { io } from "socket.io-client";
// let socket = null;
// export const connectSocket = (token) => {
//   if (!socket) {
//     socket = io("https://sandbox.agamiastro.in", {
//       transports: ["websocket"],
//     });
//     socket.on("connect", () => {
//       console.log("✅ Socket Connected");
//       socket.emit("supportJoin", { token });
//     });
//     socket.on("disconnect", () => {
//       console.log("❌ Socket Disconnected");
//     });
//   }
//   return socket;
// };
// export const getSocket = () => socket;
import { io } from "socket.io-client";


let socket = null;

export const connectSocket = (token) => {
  if (!token) {
    console.error("❌ Socket token missing");
    return null;
  }

  // Already connected
  if (socket?.connected) {
    return socket;
  }

  // Remove old socket if it exists
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io("https://sandbox.agamiastro.in", {
    transports: ["websocket", "polling"],

    // 🔥 IMPORTANT
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    console.log("✅ Support Socket Connected:", socket.id);

    // 🔥 IMPORTANT
    socket.emit("supportJoin", {
      token,
    });
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Support Socket Connection Error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Support Socket Disconnected:", reason);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};