import { Server } from "socket.io";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.log.info("hello socket 1");
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
      },
    });
    io.use(async (socket: any, next) => {
      const username = socket.handshake.auth.username;
      const userId = socket.handshake.auth.user_id;
      // const room = socket.handshake.auth.room;
      if (!username) {
        return next(new Error("invalid username"));
      }
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        {
          fields: ["id", "username"],
        }
      );
      if (!user) {
        return next(new Error("invalid user"));
      }
      socket.username = username;
      socket.userId = userId;
      // socket.room = room;
      next();
    });

    try {
      io.on("connection", async (socket: any) => {
        // fetch existing users
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
          users.push({
            userID: id,
            username: (socket as any).username,
          });
        }

        socket.emit("users", users);

        socket.on("join my room", async () => {
          const roomChat = await strapi.entityService.findMany(
            "api::room-chat.room-chat",
            {
              filters: {
                user: {
                  id: socket.userId,
                },
              },
            }
          );
          socket.room = roomChat[0].room_id;
          strapi.log.info("toi da join vao room chat");
          socket.join(socket.room);
        });
        // admin join all room of user
        socket.on("admin join room", async () => {
          const rooms = await strapi.entityService.findMany(
            "api::room-chat.room-chat",
            {}
          );
          rooms.map((room) => {
            socket.join(room.room_id);
          });
          console.log("admin join successfully");
        });
        // notify existing users
        socket.broadcast.emit("user connected", {
          userID: socket.id,
          username: socket.username,
          room: socket.room,
        });

        // forward the private message to the right recipient
        socket.on("private message", async (data) => {
          socket.to(data.to).emit("private message", {
            ...data,
            from: socket.userId,
          });

          strapi.service("api::message.message").processMessage({
            room: socket.room,
            userId: socket.userId,
            ...data,
          });

          const roomChat = await strapi.entityService.findMany(
            "api::room-chat.room-chat",
            {
              filters: {
                room_id: data.to,
              },
            }
          );

          const message = await strapi.entityService.findMany(
            "api::message.message",
            {
              filters: {
                room: {
                  id: roomChat[0].id,
                },
              },
            }
          );
          if (message.length === 0) {
            socket.emit("new user join room", {
              room_id: data.to,
            });
          }
        });

        // notify users upon disconnection
        socket.on("disconnect", () => {
          socket.broadcast.emit("user disconnected", socket.id);
        });
      });
    } catch (e) {
      strapi.log.error("error socket", e);
    }
  },
};
