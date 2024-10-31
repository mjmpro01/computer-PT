/**
 * message service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::message.message",
  ({ strapi }) => ({
    async processMessage(data) {
      try {
        let { to, userId, content } = data;

        const roomChat = await strapi.entityService.findMany(
          "api::room-chat.room-chat",
          {
            filters: {
              room_id: to,
            },
          }
        );

        const roomId = roomChat[0].id;

        const message = await strapi.entityService.findMany(
          "api::message.message",
          {
            filters: {
              room: {
                id: roomId,
              },
            },
          }
        );

        let sender_role;
        if (userId !== null) {
          const user: any = await strapi.entityService.findOne(
            "plugin::users-permissions.user",
            userId,
            {
              fields: ["id"],
              populate: {
                role: true,
              },
            }
          );
          if (
            user &&
            user.role &&
            (user.role.type === "admin" || user.role.type === "nhan_vien")
          ) {
            sender_role = "admin";
          } else {
            sender_role = "user";
          }
        }

        let buildBody = {
          content,
          sender: {
            id: userId,
          },
          room: {
            id: roomId,
          },
          sender_role,
        };

        await strapi.entityService.create("api::message.message", {
          data: buildBody,
        });

        // update status room-chat
        await strapi.entityService.update("api::room-chat.room-chat", roomId, {
          data: {
            seen_status: false,
          },
        });
      } catch (e) {
        console.log("error message queue", e);
      }
    },
  })
);
