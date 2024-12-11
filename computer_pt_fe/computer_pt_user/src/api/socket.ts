import socketEvent from "@/utils/constants/socketEvent";
import { io } from "socket.io-client";

const socket = io("http://localhost:1337/", { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

// Event listeners for debugging
socket.on(socketEvent.CONNECT_ERROR, (error) => {
  console.error("Connection error:", error);
});

socket.on(socketEvent.DISCONNECT, (reason) => {
  console.log("Socket disconnected:", reason);
});

export const handleOffSocket = () => {
  socket.off(socketEvent.CONNECT);
  socket.off(socketEvent.DISCONNECT);
  socket.off(socketEvent.USER_CONNECTED);
  socket.off(socketEvent.USER_DISCONNECTED);
  socket.off(socketEvent.PRIVATE_MESSAGE);
};

export default socket;
