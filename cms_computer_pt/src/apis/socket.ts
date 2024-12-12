import { io } from "socket.io-client";
import socketEvent from "../utils/constants/socketEvent";
import { mutate } from "swr";
import urls from "../utils/constants/urls";
const socket = io("http://localhost:1337/", { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

// socket.on(socketEvent.NEW_USER_JOIN_ROOM, () => {
//   mutate(`${urls.ROOM_CHATS}?sort[updatedAt]=desc&populate=deep,3`);
// });

// socket.on(socketEvent.PRIVATE_MESSAGE, () => {
//   mutate(`${urls.ROOM_CHATS}?sort[updatedAt]=desc&populate=deep,3`);
// });

// Event listeners for debugging
socket.on(socketEvent.CONNECT_ERROR, (error) => {
  console.error("Connection error:", error);
});

socket.on(socketEvent.DISCONNECT, (reason) => {
  console.log("Socket disconnected:", reason);
});

export const handleOffSocket = () => {
  socket.off(socketEvent.CONNECT);
  socket.off(socketEvent.PRIVATE_MESSAGE);
  socket.off(socketEvent.USER_CONNECTED);
  socket.off(socketEvent.USER_DISCONNECTED);
  socket.off(socketEvent.PRIVATE_MESSAGE);
  socket.off(socketEvent.ADMIN_JOIN_ROOM);
};

export default socket;
