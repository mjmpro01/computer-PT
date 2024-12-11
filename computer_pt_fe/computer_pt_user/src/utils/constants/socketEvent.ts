const socketEvent = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  PRIVATE_MESSAGE: 'private message',
  ADMIN_JOIN_ROOM: 'admin join room',
  JOIN_MY_ROOM: 'join my room',
  NEW_USER_JOIN_ROOM: 'new user join room',
  CONNECT_ERROR: 'connect_error',
  USER_CONNECTED: 'user connected',
  USER_DISCONNECTED: 'user disconnected',
};

export default socketEvent;
